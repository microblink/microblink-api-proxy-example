// Dependencies
const express = require('express');
const Webtask = require('webtask-tools');
const bodyParser = require('body-parser');
const request = require('request');

// Constants
const MICROBLINK_API_ENDPOINT = 'https://api.microblink.com';

// Create Express app
const app = express();

// Configure Express
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

// Express routes
app.post('/recognize/execute', function (requestToProxy, responseFromProxy) {

  // Get authoriziation header from encrypted secret variable
  // FORMAT: 'Bearer ' + apiKey + ':' + Base64(apiSecret)
  // Generate your own at: https://microblink.com/customer/api
  const authorizationHeader = requestToProxy.webtaskContext.secrets.MICROBLINK_API_AUTHORIZATION_HEADER;

  // Send HTTP POST request to Microblink API with injected Authorization header value
  request.post(MICROBLINK_API_ENDPOINT + '/recognize/execute', {
    json: requestToProxy.body,
    headers: {
      Authorization: authorizationHeader
    }
  }, (errorFromApi, responseFromApi, bodyFromApi) => {

    // Handle errors
    if (errorFromApi) {
      responseFromProxy.status(responseFromApi.statusCode).json(errorFromApi);
      return;
    }

    // Handle success response
    responseFromProxy.status(responseFromApi.statusCode).json(bodyFromApi);
  });

});

// Create Webtask from Express application
module.exports = Webtask.fromExpress(app);
