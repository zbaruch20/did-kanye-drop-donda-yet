// Authorization services for Spotify Web API

// Node modules
let https = require('https');
require('buffer');
require('dotenv').config();

exports.auth_request = (callback) => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const secret_key = process.env.SPOTIFY_SECRET_KEY;

    // Request options
    const req_options = {
        host: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        auth: `${client_id}:${secret_key}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    // Make HTTP request and store response body
    const auth_req = https.request(req_options, (res) => {
        let body_str = '';
        res.on('data', (chunk) => {
            body_str += chunk.toString(); // Add chunks to body each time data is received
        });
        res.on('end', () => {
            // On request end parse this body and perform callback on access token
            callback(JSON.parse(body_str).access_token); 
        });
    });

    auth_req.on('error', (e) => {
        console.error('Error with auth request:');
        console.error(e);
    });

    // Write body to request and end
    auth_req.write('grant_type=client_credentials');
    auth_req.end();
};
