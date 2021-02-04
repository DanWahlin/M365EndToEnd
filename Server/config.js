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
    validateIssuer: true,
  
    // Required. 
    // Set to true if you use `function(req, token, done)` as the verify callback.
    // Set to false if you use `function(req, token)` as the verify callback.
    passReqToCallback: false,
  
    // Required if you are using common endpoint and setting `validateIssuer` to true.
    // For tenant-specific endpoint, this field is optional, we will use the issuer from the metadata by default.
    issuer: null,

    // Required to set to true if you are using B2C tenant.
    isB2C: false,

    // Only required if you are using B2C tenant. It is a string starting with 'B2C_1_' (case insensitive).
    policyName: null,
  
    // Optional, default value is clientID
    audience: null,
  
    // Optional. Default value is false.
    // Set to true if you accept access_token whose `aud` claim contains multiple values.
    allowMultiAudiencesInToken: false,
  
    // Optional. 'error', 'warn' or 'info'
    loggingLevel:'info',
  };

  module.exports = config;