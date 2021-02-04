"use strict";
const express   = require('express'),
    bodyParser  = require('body-parser'),
    fs          = require('fs'), 
    path        = require('path'),
    passport    = require('passport'),
    OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy,
    app         = express(),     
    customers   = JSON.parse(fs.readFileSync('data/customers.json', 'utf-8')),
    orders      = JSON.parse(fs.readFileSync('data/orders.json', 'utf-8')),
    states      = JSON.parse(fs.readFileSync('data/states.json', 'utf-8')),
    userSettings = JSON.parse(fs.readFileSync('data/userSettings.json', 'utf-8')),
    inContainer = process.env.CONTAINER,
    inAzure = process.env.WEBSITE_RESOURCE_GROUP,
    ENV_FILE = path.join(__dirname, '.env'),
    port = process.env.PORT || 8080;

// Load ENV vars from .env file
require('dotenv').config({ path: ENV_FILE });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

//The dist folder has our static resources (index.html, css, images)
if (!inContainer) {
    // Serve up SPA from ./dist folder
    app.use(express.static(__dirname + '/dist')); 
    console.log(__dirname);
}

app.use(passport.initialize()); // Starts passport
app.use(passport.session()); // Provides session support

// current owner
let owner = null;
const config = require('./config');

const bearerStrategy = new OIDCBearerStrategy(config,
    function(token, done) {
        console.log(token, 'was the token retreived');
        if (!token.oid)
            done(new Error('oid is not found in token'));
        else {
            owner = token.oid;
            done(null, token);
        }
    }
);

passport.use(bearerStrategy);

// API endpoints

function authRoute() {
    return passport.authenticate('oauth-bearer', { session: false });
}

app.get('/api/userSettings', authRoute(), (req, res) => {
    // Return in memory userSettings
    res.json(userSettings);
});

app.put('/api/userSettings/:id', authRoute(), (req, res) => {
    // Update in userSettings in memory
    const id = req.params.id;
    userSettings = req.body;
    res.json({ status: true });
});

app.get('/api/customers/page/:skip/:top', authRoute(), (req, res) => {
    const topVal = req.params.top,
          skipVal = req.params.skip,
          skip = (isNaN(skipVal)) ? 0 : +skipVal;  
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > customers.length) {
        top = skip + (customers.length - skip);
    }

    console.log(`Skip: ${skip} Top: ${top}`);

    const pagedCustomers = customers.slice(skip, top);
    res.setHeader('X-InlineCount', customers.length);
    res.json(pagedCustomers);
});

app.get('/api/customers', authRoute(), (req, res) => {
    res.json(customers);
});

app.get('/api/customers/:id', authRoute(), (req, res) => {
    let customerId = +req.params.id;
    let selectedCustomer = null;
    for (let customer of customers) {
        if (customer.id === customerId) {
           // found customer to create one to send
           selectedCustomer = {};
           selectedCustomer = customer;
           break;
        }
    }  
    res.json(selectedCustomer);
});

app.post('/api/customers', authRoute(), (req, res) => {
    let postedCustomer = req.body;
    let maxId = Math.max.apply(Math,customers.map((cust) => cust.id));
    postedCustomer.id = ++maxId;
    postedCustomer.gender = (postedCustomer.id % 2 === 0) ? 'female' : 'male';
    customers.push(postedCustomer);
    res.json(postedCustomer);
});

app.put('/api/customers/:id', authRoute(), (req, res) => {
    let putCustomer = req.body;
    let id = +req.params.id;
    let status = false;

    //Ensure state name is in sync with state abbreviation 
    const filteredStates = states.filter((state) => state.abbreviation === putCustomer.state.abbreviation);
    if (filteredStates && filteredStates.length) {
        putCustomer.state.name = filteredStates[0].name;
        console.log('Updated putCustomer state to ' + putCustomer.state.name);
    }

    for (let i=0,len=customers.length;i<len;i++) {
        if (customers[i].id === id) {
            customers[i] = putCustomer;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/customers/:id', authRoute(), (req, res) => {
    let customerId = +req.params.id;
    for (let i=0,len=customers.length;i<len;i++) {
        if (customers[i].id === customerId) {
           customers.splice(i,1);
           break;
        }
    }  
    res.json({ status: true });
});

app.get('/api/orders', authRoute(), (req, res) => {
    res.json(orders);
});

app.get('/api/orders/:id', authRoute(), (req, res) => {
    let customerId = +req.params.id;
    for (let cust of customers) {
        if (cust.customerId === customerId) {
            return res.json(cust);
        }
    }
    res.json([]);
});

app.get('/api/states', authRoute(), (req, res) => {
    res.json(states);
});

app.post('/api/auth/login', (req, res) => {
    const userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', authRoute(), (req, res) => {
    res.json(true);
});

if (!inContainer) {
    // redirect all others to the index (HTML5 history)
    app.all('/*', function(req, res) {
        res.sendFile(__dirname + '/dist/index.html');
    });
}

app.listen(port);

console.log('Express listening on port ' + port);

//Open browser
if (!inContainer && !inAzure) {
    // const opn = require('opn');

    // opn('http://localhost:' + port).then(() => {
    //     console.log('Browser closed.');
    // });
}


