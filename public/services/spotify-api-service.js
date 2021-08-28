// Functions that access the Spotify Web API and obtains certain data

// Node modules
let https = require('https');
require('buffer');
require('dotenv').config();

exports.dondaReleased = () => {
    auth_request((res_body) => {
        console.log(res_body.access_token);
    });

    return false;
};

let auth_request = (callback) => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const secret_key = process.env.SPOTIFY_SECRET_KEY;

    // Request options
    let req_options = {
        host: "accounts.spotify.com",
        path: "/api/token",
        method: "POST",
        auth: `${client_id}:${secret_key}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    // Make HTTP request and store response body
    let auth_req = https.request(req_options, (res) => {
        let body_str = ''
        res.on('data', (chunk) => {
            body_str += chunk.toString();   // Add chunks to body each time data is received
        });
        res.on('end', () => {
            callback(JSON.parse(body_str)); // On request end parse this body and perform callback function
        });
    });

    auth_req.on('error', (e) => {
        console.error("Error with auth request:");
        console.error(e);
    });

    // Write body to request and end
    auth_req.write("grant_type=client_credentials");
    auth_req.end();
};