/**
 * Service that handles account api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the account api functions.
 */
export default request => ({
    /**
     * Retrieves an account object by id.
     *
     * @param {String} id user's uuid, account uuid or handle.
     * @param {String} token user's authentication token
     *
     * @returns {Promise} resolves to account data if successful.
     */
    getAccount: async (id, token) =>
        request({
            endpoint: `api/v1/account/detail/${id}/`,
            token,
        }),
    /**
     * Update an account object.
     *
     * @param {String} id user's uuid, account uuid or handle.
     * @param {Object} data object with account model keys to update.
     * @param {String} token user's authentication token.
     * @param {Boolean} isMedia set to true if updating media files (images).
     *
     * @returns {Promise} resolves to account object if successful.
     */
    updateAccount: (id, data, token, isMedia = false) => {
        let headers;
        if (isMedia) {
            headers = {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            };
        }
        return request({
            endpoint: `api/v1/account/detail/${id}/`,
            verb: "PATCH",
            data,
            token,
            headers,
        });
    },
    /**
     * Search accounts by query string.
     *
     * @param {String} query search query.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to an array of accounts if successful.
     */
    searchByQuery: (query, token) =>
        request({
            endpoint: "api/v1/account/search/",
            verb: "POST",
            token,
            data: {
                query,
            },
        }),
});
