// Dependencies
const express    = require( "express"     ); // Server, https://expressjs.com/
const bodyParser = require( "body-parser" );
const cors       = require( "cors"        ); // ExpressJS CORS middleware, https://expressjs.com/en/resources/middleware/cors.html
const axios      = require( "axios"       ); // HTTP client, https://github.com/axios/axios

// Constants
const API_LOCATION = "https://demoapi.microblink.com";
const PROXY_PORT   = process.env.PROXY_PORT || 80;

// Initialize express app
const app = express();

/**
 * Configure body parser
 *
 * - Automatically parse body for content type "application/json"
 * - Set limit of request body - it's important to modify default limit of 100kb
 *   request body will contain images in encoded in base64 format.
 */
app.use( bodyParser.json( { limit: '5mb' } ) );

// Set CORS options
const corsOptions =
{
    // Replace with origin of frontend web application
    origin: "https://myapp.com"
}

// Due to CORS preflight request, it's important to register OPTIONS method for every endpoint
app.options( "/v1/recognizers/blinkid", cors( corsOptions ) );

/**
 * Register all relevant endpoints that are going to be used with predefined CORS settings.
 *
 * Avoid doing something like app.post( "/" ), but rather explicitly
 * define allowed endpoints.
 */
app.post( "/v1/recognizers/blinkid", cors( corsOptions ), function ( req, res )
{
    // Send a request to backend service
    const endpoint = API_LOCATION + "/v1/recognizers/blinkid";
    const body     = req.body;

    axios.post( endpoint, body )
        .then( function ( scanResponse )
        {
            console.log( "Scan response from backend service:", scanResponse );

            // Send limited information to frontend
            res.status( 200 ).json( { status: "OK" } );
        } )
        .catch( function ( backendError )
        {
            console.log( "There was an error during communication with backend service!", backendError );
            res.status( 500 ).json( { status: "ERROR" } );
        } );
} );

// Run the app
app.listen( PROXY_PORT, function ()
{
    console.log( `Proxy application is listening on port ${ PROXY_PORT }...` );
} );
