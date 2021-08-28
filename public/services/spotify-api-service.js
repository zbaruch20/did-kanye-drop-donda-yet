// Functions that access the Spotify Web API and obtains certain data

// Node modules
let https = require('https');
let auth_service = require('./spotify-auth-service');

exports.checkDondaReleased = () => {
    auth_service.auth_request((access_token) => {
        console.log(access_token);
    });
};
