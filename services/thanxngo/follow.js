/**
 * Service that handles follow api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the auth follow functions.
 */
export default request => ({
    /**
     * Retrieves a user's followers list.
     *
     * @param {String} id user's uuid, account uuid or handle.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a list of followers if successful
     */
    getFollowerList: (id, token) =>
        request({
            endpoint: `api/v1/follow/follower-list/${id}/`,
            token,
        }),
    /**
     * Retrieves a user's following list.
     *
     * @param {String} id user's uuid, account uuid or handle.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a list of followers if successful
     */
    getFolloweeList: (id, token) =>
        request({
            endpoint: `api/v1/follow/followee-list/${id}/`,
            token,
        }),
    /**
     * Follow a user.
     *
     * @param {String} id user's uuid, account uuid or handle.
     * @param {String} followeeId uuid of the account to follow.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to the follow item if successful.
     */
    followUser: (id, followeeId, token) =>
        request({
            endpoint: `api/v1/follow/follower-list/${id}/`,
            verb: "POST",
            data: {
                followee: followeeId,
            },
            token,
        }),
    /**
     * Unfollow a user.
     *
     * @param {*} followeeId uuid of the account to stop following.
     * @param {*} token's authentication token.
     *
     * @returns {Promise} resolves to the follow item if successful.
     */
    unfollowUser: (followeeId, token) =>
        request({
            endpoint: `api/v1/follow/detail/${followeeId}/`,
            verb: "DELETE",
            token,
        }),
});
