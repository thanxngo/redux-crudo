/**
 * Service that handles auth api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the auth api functions.
 */
export default request => ({
    /**
     * Registers a new user.
     *
     * @param {String} data.first_name user's first name.
     * @param {String} data.last_name user's last name.
     * @param {String} data.identifier user's unique sign in identifier.
     * @param {String} data.password user's password.
     *
     * @returns {Promise} resolves to a user object if successful.
     */
    createUser: ({ first_name, last_name, identifier, password }) => {
        const parsedIdentifier =
            identifier.indexOf("@") > -1 && identifier.indexOf("+") !== 0
                ? { email: identifier }
                : { phone_number: identifier };

        return request({
            endpoint: "api/v1/auth/user/create/",
            verb: "POST",
            data: {
                ...parsedIdentifier,
                first_name,
                last_name,
                password,
                withAuth: false,
            },
        });
    },
    /**
     * Creates an API token with a identifier and password.
     *
     * @param {String} data.fbToken authentication token from FBSDK.
     * @param {Object} data.credentials object containing user identifier and password.
     *
     * @returns {Promise} resolves to the token if created successfully.
     */
    getToken: ({ fbToken, credentials }) =>
        request({
            endpoint: fbToken
                ? "api/v1/auth/social_connect/facebook/"
                : "api/v1/auth/token/create/",
            verb: "POST",
            data: fbToken ? { access_token: fbToken } : credentials,
            withAuth: false,
        }),
    /**
     * Retrieves a user object from an API authentication token.
     *
     * @param {String} token a user's API token.
     *
     * @returns {Promise} resolves to a user object if request is successful.
     */
    getMe: token =>
        request({
            endpoint: "api/v1/auth/me/",
            token,
        }),
    /**
     * Allows to update a User object
     *
     * @param {Object} data object with user keys to update.
     * @param {String} data.account_handle a user's new handle.
     * @param {String} token  a user's API auth token.
     *
     * @returns {Promise} resolves to a user object if request is successful.
     */
    updateMe: (data, token) =>
        request({
            endpoint: "api/v1/auth/me/",
            verb: "PATCH",
            token,
            data,
        }),
    /**
     * Allows for confirming a user's phone number.
     *
     * @param {Object} data object with key-value pairs to confirm a phone number.
     * @param {String} data.phone_number user's phone number (w/ country code).
     * @param {String} data.token SMS verification code.
     * @param {String} token a user's API auth token
     *
     * @returns {Promise<String>} resolves to the empty String if successful.
     */
    confirmPhoneNumber: (data, token) =>
        request({
            endpoint: "api/v1/auth/user/confirm_phone_number/",
            verb: "POST",
            token,
            data,
        }),
    /**
     * Allows to send a reset password link.
     *
     * @param {Object} data object with key-value pairs to send a reset password link.
     * @param {String} data.email The email to send the link.
     * @param {String} token a user's API auth token
     *
     * @returns {Promise<String>} resolves to an empty String if successful.
     */
    resetPassword: (data, token) =>
        request({
            endpoint: "api/v1/auth/password_reset_token/",
            verb: "POST",
            token,
            data,
        }),
});
