# microblink-api-proxy-example
Microblink API proxy Node.js Express application hosted as server less on Webtask.io

## Requirements

- Account on https://webtask.io/
- Authorization header from Microblink dashboard https://microblink.com/customer/api
- Frontend application with Microblink JS SDK   
https://github.com/microblink/microblink-js   
https://www.npmjs.com/package/microblink

## Getting started

1. Make an empty Webtask function in [Webtask Code Editor](https://webtask.io/make) with name `microblinkApiProxyExample`
2. Copy the source of [microblink-api-proxy-example.js](./microblink-api-proxy-example.js) to the body of Webtask function
3. Create secret variable in Webtask function `MICROBLINK_API_AUTHORIZATION_HEADER=*authorization header value from Microblink API dashboard*`
4. To the frontend application add   
`Microblink.SDK.SetEndpoint('https://wt-XXXX.sandbox.auth0-extend.com/microblinkApiProxyExample');`   
where `XXXX` is your Webtask identificator
