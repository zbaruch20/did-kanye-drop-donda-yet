let spotifyApiService = require('../services/spotify-api-service');

module.exports = class DondaStatus {
    constructor(released = false) {
        this.released = released;
    }

    updateReleased() {
        this.released = spotifyApiService.dondaReleased();
    }
};
