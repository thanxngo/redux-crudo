/**
 * Service that handles geolocation api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the auth geolocation functions.
 */
export default request => ({
    /**
     * Saves a user's location.
     *
     * @param {Object} data object with geolocation keys.
     * @param {Number} data.longitude user's location longitude.
     * @param {Number} data.latitude user's location latitude.
     * @param {String} token user's authentication token
     *
     * @returns {Promise} resolves to geolocation data if successful.
     */
    saveLocation: (data, token) =>
        request({
            verb: "POST",
            endpoint: "api/v1/geolocation/create/",
            data,
            token,
        }),
    /**
     * Search accounts nearby given location coordinates and a tolerance radius.
     *
     * @param {Object} data an object to query accounts by location.
     * @param {String} data.radius user's location longitude.
     * @param {String} data.longitude user's location latitude.
     * @param {String} data.latitude user's location longitude.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to geolocation data if successful.
     */
    searchNearbyAccounts: (data, token) =>
        request({
            verb: "POST",
            endpoint: "api/v1/geolocation/search/",
            data,
            token,
        }),
});
