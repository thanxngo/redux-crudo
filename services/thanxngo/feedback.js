/**
 * Service that handles feedback api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the auth feedback functions.
 */
export default request => ({
    /**
     * Retrieves a user's list of feedbacks.
     *
     * @param {String} id account uuid or handle
     * @param {String} token user's authentication token
     *
     * @returns {Promise} resolves to a feedback list if successful.
     */
    getFeedbackList: (id, token) =>
        request({
            endpoint: `api/v1/feedback/list/${id}/`,
            token,
        }),
    /**
     * Saves a new feedback
     *
     * @param {String} id account uuid or handle of the receiver.
     * @param {Object} data feedback content, score and receiver uuid.
     * @param {String} data.receiver receivers account uuid.
     * @param {String} data.content feedback content.
     * @param {Number} data.score feedback score.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to the feedback object if successful.
     */
    createFeedback: (id, data, token) =>
        request({
            endpoint: `api/v1/feedback/list/${id}/`,
            verb: "POST",
            data,
            token,
        }),
    /**
     * Updates a feedback.
     *
     * @param {String} feedbackId account uuid or handle of the receiver.
     * @param {Object} data feedback object key to update.
     * @param {Boolean} data.is_public whether the feedback should be public or not.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to the feedback object if successful.
     */
    updateFeedback: (feedbackId, data, token) =>
        request({
            endpoint: `api/v1/feedback/detail/${feedbackId}/`,
            verb: "PATCH",
            data,
            token,
        }),
});
