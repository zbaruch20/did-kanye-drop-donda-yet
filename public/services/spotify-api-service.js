// Functions that access the Spotify Web API and obtains certain data

// Node modules
let https = require('https');
let auth_service = require('./spotify-auth-service');
let DondaStatus = require('../models/donda-status');

exports.checkDondaReleased = () => {
    auth_service.auth_request((access_token) => {
        access_kanye_albums(access_token, albums_include);
    });
};

let access_kanye_albums = (access_token, callback) => {
    const kanye_spotify_id = '5K4W6rqBFWDnAN6FQUkS6x';

    const req_options = {
        host: 'api.spotify.com',
        path: `/v1/artists/${kanye_spotify_id}/albums?market=US`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };

    https
        .get(req_options, (res) => {
            let body_str = '';
            res.on('data', (d) => {
                body_str += d.toString(); // Process data and add to body
            });
            res.on('end', () => {
                callback(JSON.parse(body_str), 'DONDA'); // Process callback for parsed body
            });
        })
        .on('error', (err) => {
            console.error("Error when accessing Kanye's albums:");
            console.error(err);
        });
};

let albums_include = (res, name) => {
    const donda_status = new DondaStatus();
    const donda = res.items.find(
        (a) => a.name.toLowerCase() == name.toLowerCase()
    );
    if (donda) {
        // Temporarially just printing results to console.
        // In the future we'll use JS to modify the webpage.
        console.log(
            `Kanye dropped DONDA!! It was released on ${donda.release_date}.`
        );
        console.log(
            `You can listen to it here: ${donda.external_urls.spotify}`
        );

        // Update model
        donda_status.released = true;
        donda_status.donda_info = donda;
    } else {
        console.log('Kanye did not drop DONDA yet.');
    }
};
