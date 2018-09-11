/**
 * Service that handles history api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the auth history functions.
 */
export default request => ({
    /**
     * Retrieves a user's account history if successful.
     *
     * @param {String} token user's authentication token
     *
     * @returns {Promise} resolves to account history if successful.
     */
    getHistory: token =>
        request({
            endpoint: "api/v1/history/list/",
            token,
        }),
});
