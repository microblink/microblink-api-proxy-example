# microblink-api-proxy-example
Microblink API proxy Node.js Express application hosted as server less on Webtask.io

## About

This application is just an example how the Microblink API proxy should looks like and it is hosted on Webtask.io because of it's simplicity as serverless solution. With a little modification it can be easily hostend on the other serverless platforms: Amazon Lambda, Firebase Cloud Functions, etc.   

Also with a few modification this simple Express application can be hostend on any Linux server with Node.js support or it can be rewritten in some other programming language: Java, PHP, Ruby, ... and also this simple endpoint `ENDPOINT + /recognize/execute` can be integrated to any other backend application.

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

## Security issue notes

To keep the Microblink API authorization header (API key and API secret) in the frontend single-page application (Angular, React, Vanilla JS, ...) it is **not safety** and **not recommended** and have the directly access to the endpoint `https://api.microblink.com/recognize/execute` from the client side because all JavaScript code is executing in the browser locally and anyone who have an access to your web application can get your credentials from the JS or HTML served code.  

Direct access to the Microblink API access from the frontend application is only recommended during the development to avoid the proxy network latency and make the development process faster and when your application is hostend locally and not available from the outside (public Internet).   

Nice explanation about this security issue is available in this [Codepen's blog post](https://codepen.io/iospadov/post/apis-and-authentication-keeping-your-access-keys-secure) and also in this [Quora's thread](https://www.quora.com/How-do-you-hide-protect-API-keys-when-you-have-to-use-them-in-client-side-JavaScript).
