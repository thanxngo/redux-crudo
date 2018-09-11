/**
 * Service that handles experience api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the auth experience functions.
 */
export default request => ({
    /**
     * Retrieves a user's list of experiences.
     *
     * @param {String} id account uuid or handle
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a user's experience list if successful.
     */
    getExperienceList: (id, token) =>
        request({
            endpoint: `api/v1/experience/list/${id}/`,
            token,
        }),
    /**
     * Adds a new experience to a user's list of experiences.
     *
     * @param {String} id user uuid or handle.
     * @param {Object} data body of an experience object.
     * @param {String} data.position title of the experience position.
     * @param {String} data.city city of the experience.
     * @param {String} data.company company name.
     * @param {String} data.from_date start date for the experience.
     * @param {String} data.to_date end date for the experience.
     * @param {Boolean} data.is_current_job whether is the user's current position.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to the newly created experience if successful.
     */
    createExperience: (id, data, token) =>
        request({
            endpoint: `api/v1/experience/list/${id}/`,
            verb: "POST",
            data,
            token,
        }),
    /**
     * Updates an experience object.
     *
     * @param {String} experienceId uuid of the experience to update.
     * @param {Object} data body of an experience object.
     * @param {String} data.position title of the experience position.
     * @param {String} data.city city of the experience.
     * @param {String} data.company company name.
     * @param {String} data.from_date start date for the experience.
     * @param {String} data.to_date end date for the experience.
     * @param {Boolean} data.is_current_job whether is the user's current position.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to the newly updated experience if successful.
     */
    updateExperience: (experienceId, data, token) =>
        request({
            endpoint: `api/v1/experience/detail/${experienceId}/`,
            verb: "PATCH",
            data,
            token,
        }),
    /**
     * Deletes an experience object.
     *
     * @param {String} experienceId uuid of the experience to delete.
     * @param {String} token user's authentication token.
     *
     * @returns {void}
     */
    deleteExperience: (experienceId, token) =>
        request({
            endpoint: `api/v1/experience/detail/${experienceId}/`,
            verb: "DELETE",
            token,
        }),
});
