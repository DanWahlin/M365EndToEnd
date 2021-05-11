const tenantName = process.env.tenantName;
const clientId = process.env.AppId;

// https://github.com/AzureADQuickStarts/AppModelv2-WebAPI-nodejs/blob/master/node-server/config.js

const config = {
    // Required
    identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/v2.0/.well-known/openid-configuration`,
    // or 'https://login.microsoftonline.com/<your_tenant_guid>/v2.0/.well-known/openid-configuration'
    // or you can use the common endpoint
    // 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration'
    
    // Required
    clientID: clientId,
  
    // Required.
    // If you are using the common endpoint, you should either set `validateIssuer` to false, or provide a value for `issuer`.
    validateIssuer: false,
  
    // Required. 
    // Set to true if you use `function(req, token, done)` as the verify callback.
    // Set to false if you use `function(req, token)` as the verify callback.
    passReqToCallback: false,
  
    // Required if you are using common endpoint and setting `validateIssuer` to true.
    // For tenant-specific endpoint, this field is optional, we will use the issuer from the metadata by default.
    // ### Needs this to work in Teams
    // issuer: 'https://sts.windows.net/ca166736-ff5b-468d-9e18-6c1d283463b4/',

    // Needs this to work with MSAL
    issuer: null,

    // Optional, default value is clientID
    // ### Needs this to work in Teams
    // audience: 'api://learntogethercrm.ngrok.io/a80a2929-6ad8-4ba6-a605-ad137e63e9a6',

    // Needs this to work with MSAL (can supply a value of the AppId as well)

    audience: ['a80a2929-6ad8-4ba6-a605-ad137e63e9a6', 'api://learntogethercrm.ngrok.io/a80a2929-6ad8-4ba6-a605-ad137e63e9a6'],
    // Required to set to true if you are using B2C tenant.
    isB2C: false,

    // Only required if you are using B2C tenant. It is a string starting with 'B2C_1_' (case insensitive).
    policyName: null,
  
    // Optional. Default value is false.
    // Set to true if you accept access_token whose `aud` claim contains multiple values.
    allowMultiAudiencesInToken: false,
  
    // Optional. 'error', 'warn' or 'info'
    loggingLevel:'info',

    // Set to false for detailed errors in the log output (set to true if you are in production)
    loggingNoPII: false
  };

  module.exports = config;