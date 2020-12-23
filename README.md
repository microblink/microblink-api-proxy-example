# Microblink Backend Proxy Examples

This repository contains examples of proxy applications that an API request would go through on its way to and from our **Cloud** or **Self-hosted** backend services.

Remember that these examples are only here to provide you with a starting point when setting up your own proxy application — do not use them in production.

Once properly configured, a proxy app will act as a gateway between your web application and one of our backend solutions, either:

* [BlinkID Cloud API](https://microblink.com/products/blinkid/cloud-api)
* [BlinkID Self-hosted API](https://microblink.com/products/blinkid/self-hosted-api)
* [BlinkCard Self-hosted API](https://microblink.com/products/blinkcard/self-hosted-api)
* [PDF417 Self-hosted API](https://microblink.com/products/blinkid/self-hosted-api)

You can find the examples for Cloud API in the [cloud-api](cloud-api) directory, while the examples for Self-hosted API are located in the [self-hosted-api](self-hosted-api) directory.

## <a name="security"></a> Security

The main purpose of a proxy application is to provide a security layer in front of the backend service.

Since the most common usage scenario is to call a backend service from a web application connected to a public network, it's important to protect the service from unauthorized requests.

When it comes to **Cloud API**, it's important to hide the authorization key from the end user. In the examples above, the authorization key is added to the request in the proxy application.

Since **Self-hosted API** is usually integrated into existing backend ecosystems, you should implement the standard security mechanisms that are already in use.

### <a name="security-cors"></a> CORS

[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is an additional security mechanism you can use to protect the backend service by defining which domains can send API requests to your backend.

Keep in mind that CORS only works when end users are using front end applications inside major web browsers. Provided examples have sample code which shows how to define allowed domains.

## <a name="custom-response"></a> Modification of response

Another common use of a proxy application is to modify the response object returned to the front end.

Provided Node.js examples have a simple logic that transforms a response from the back end service to only return what is necessary for a frontend to work as intended.