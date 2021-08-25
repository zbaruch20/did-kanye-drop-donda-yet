# did-kanye-drop-donda-yet
This is a web application that uses Node.js to access the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to determine if Kanye West has released the album DONDA yet.

Below is information needed to build and deploy the application.

# Node.js
This application is built and ran on Node.js. You can download the latest version of Node.js [here](https://nodejs.org/en/download/).

# Spotify Web API Authentication
All endpoints of the Spotify Web API require [authentication](https://developer.spotify.com/documentation/general/guides/authorization-guide/), either through App Authorization or User Authorization. This application uses App Authorization with the [Client Credentials flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow), as there is no need for the app to obtain specific user information.

This flow requires the use of a Client ID and Secret Key, which can be obtained by [registering the app](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app) on Spotify's developer dashboard. Both the Client ID and Secret Key are MD5 hashes (i.e. 32-digit hexidecimal numbers). These values must be stored as environment variables in a file called `.env` in the root of the repository as follows (where the values of `SPOTIFY_CLIENT_ID` and `SPOTIFY_SECRET_KEY` match the values on your app):

```
SPOTIFY_CLIENT_ID=00112233445566778899aabbccddeeff
SPOTIFY_SECRET_KEY=0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f
```

The appplication then uses these enviornment variables to authenticate with the Spotify Web API and be able to access artist and album data.

# Local Deployment
To deploy this application locally, use the following commands. Make sure you have Node.js installed first!

```bash
$ npm install   # Install needed dependencies
$ npm start     # Local deployment
```

The production version of this application will be deployed to [Heroku](https://www.heroku.com/).