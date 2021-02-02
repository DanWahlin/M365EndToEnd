import { Injectable } from '@angular/core';

import { RequestInfo, InMemoryDbService } from 'angular-in-memory-web-api';
import { Customer } from './model/customer';
import { Order } from './model/order';
import { Theme } from '../shared/enums';
import { UserSettings } from '../shared/interfaces';

/** In-memory database data */
interface Db {
  [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  /** True if in-mem service is intercepting; all requests pass thru when false. */
  active = true;
  maxId = 0;

  /** Create the in-memory database. Sample data is found below. */
  createDb(reqInfo?: RequestInfo) {
    return { customers, orders, userSettings };
  }

  /**
   * Simulate generating new Id on the server
   * All collections in this db have numeric ids.
   * Seed grows by highest id seen in any of the collections.
   */
  genId(collection: { id: number }[], collectionName: string) {
    this.maxId = 1 + collection.reduce((prev, cur) => Math.max(prev, cur.id || 0), this.maxId);
    return this.maxId;
  }

}

const userSettings: UserSettings[] = [
  {
    'id': 1,
    'preferredName': 'Jim',
    'email': 'jim@test.com',
    'theme': 0
  }
];

const customers: Customer[] = [
  {
        "id": 1,
        "firstName": "ted",
        "lastName": "james",
        "gender": "male",
        "address": "1234 Anywhere St.",
        "city": " Phoenix ",
        "state": {
            "abbreviation": "AZ",
            "name": "Arizona"
        },
        "latitude": 33.299,
        "longitude": -111.963
  },
  {
        "id": 2,
        "firstName": "Michelle",
        "lastName": "Thompson",
        "gender": "female",
        "address": "345 Cedar Point Ave.",
        "city": "Encinitas ",
        "state": {
            "abbreviation": "CA",
            "name": "California"
        },
        "latitude": 33.037,
        "longitude": -117.291
  },
  {
        "id": 3,
        "firstName": "Zed",
        "lastName": "Bishop",
        "gender": "male",
        "address": "1822 Long Bay Dr.",
        "city": " Seattle ",
        "state": {
            "abbreviation": "WA",
            "name": "Washington"
        },
        "latitude": 47.596,
        "longitude": -122.331
  },
  {
        "id": 4,
        "firstName": "Tina",
        "lastName": "Adams",
        "gender": "female",
        "address": "79455 Pinetop Way",
        "city": "Chandler",
        "state": {
            "abbreviation": "AZ",
            "name": " Arizona "
        },
        "latitude": 33.299,
        "longitude": -111.963
  },
  {
        "id": 5,
        "firstName": "Igor",
        "lastName": "Minar",
        "gender": "male",
        "address": "576 Crescent Blvd.",
        "city": " Dallas",
        "state": {
            "abbreviation": "TX",
            "name": "Texas"
        },
        "latitude": 32.782927,
        "longitude": -96.806191
  },
  {
        "id": 6,
        "firstName": "Brad",
        "lastName": "Green",
        "gender": "male",
        "address": "9874 Center St.",
        "city": "Orlando ",
        "state": {
            "abbreviation": "FL",
            "name": "Florida"
        },
        "latitude": 28.384238,
        "longitude": -81.564103
  },
  {
        "id": 7,
        "firstName": "Misko",
        "lastName": "Hevery",
        "gender": "male",
        "address": "9812 Builtway Appt #1",
        "city": "Carey ",
        "state": {
            "abbreviation": "NC",
            "name": "North Carolina"
        },
        "latitude": 35.727985,
        "longitude": -78.797594
  },
  {
        "id": 8,
        "firstName": "Heedy",
        "lastName": "Wahlin",
        "gender": "female",
        "address": "4651 Tuvo St.",
        "city": "Anaheim",
        "state": {
            "abbreviation": "CA",
            "name": "California"
        },
        "latitude": 33.809898,
        "longitude": -117.918757
  },
  {
        "id": 9,
        "firstName": "John",
        "lastName": "Papa",
        "gender": "male",
        "address": "66 Ray St.",
        "city": " Orlando",
        "state": {
            "abbreviation": "FL",
            "name": "Florida"
        },
        "latitude": 28.384238,
        "longitude": -81.564103
  },
  {
        "id": 10,
        "firstName": "Tonya",
        "lastName": "Smith",
        "gender": "female",
        "address": "1455 Chandler Blvd.",
        "city": " Atlanta",
        "state": {
            "abbreviation": "GA",
            "name": "Georgia"
        },
        "latitude": 33.762297, 
        "longitude": -84.392953
  }
];

const orders: Order[] = [
  {
    'id': 1,
    'customerId': 1,
    'orderItems': [
      { 'id': 1, 'productName': 'Baseball', 'itemCost': 9.99 },
      { 'id': 2, 'productName': 'Bat', 'itemCost': 19.99 }
    ]
  },
  {
    'id': 2,
    'customerId': 2,
    'orderItems': [
      { 'id': 3, 'productName': 'Basketball', 'itemCost': 7.99 },
      { 'id': 4, 'productName': 'Shoes', 'itemCost': 199.99 }
    ]
  },
  {
    'id': 3,
    'customerId': 3,
    'orderItems': [
      { 'id': 5, 'productName': 'Frisbee', 'itemCost': 2.99 },
      { 'id': 6, 'productName': 'Hat', 'itemCost': 5.99 }
    ]
  },
  {
    'id': 4,
    'customerId': 4,
    'orderItems': [
      { 'id': 7, 'productName': 'Boomerang', 'itemCost': 29.99 },
      { 'id': 8, 'productName': 'Helmet', 'itemCost': 19.99 },
      { 'id': 9, 'productName': 'Kangaroo Saddle', 'itemCost': 179.99 }
    ]
  },
  {
    'id': 5,
    'customerId': 5,
    'orderItems': [
      { 'id': 10, 'productName': 'Budgie Smugglers', 'itemCost': 19.99 },
      { 'id': 11, 'productName': 'Swimming Cap', 'itemCost': 5.49 }
    ]
  },
  {
    'id': 6,
    'customerId': 6,
    'orderItems': [
      { 'id': 12, 'productName': 'Bow', 'itemCost': 399.99 },
      { 'id': 13, 'productName': 'Arrows', 'itemCost': 69.99 }
    ]
  },
  {
    'id': 7,
    'customerId': 7,
    'orderItems': [
      { 'id': 14, 'productName': 'Baseball', 'itemCost': 9.99 },
      { 'id': 15, 'productName': 'Bat', 'itemCost': 19.99 }
    ]
  },
  {
    'id': 8,
    'customerId': 8,
    'orderItems': [
      { 'id': 16, 'productName': 'Surfboard', 'itemCost': 299.99 },
      { 'id': 17, 'productName': 'Wax', 'itemCost': 5.99 },
      { 'id': 18, 'productName': 'Shark Repellent', 'itemCost': 15.99 }
    ]
  },
  {
    'id': 9,
    'customerId': 9,
    'orderItems': [
      { 'id': 19, 'productName': 'Saddle', 'itemCost': 599.99 },
      { 'id': 20, 'productName': 'Riding cap', 'itemCost': 79.99 }
    ]
  },
  {
    'id': 10,
    'customerId': 10,
    'orderItems': [
      { 'id': 21, 'productName': 'Baseball', 'itemCost': 9.99 },
      { 'id': 22, 'productName': 'Bat', 'itemCost': 19.99 }
    ]
  }
];