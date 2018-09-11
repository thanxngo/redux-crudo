/**
 * Service that handles payment api.
 * @param {Function} request - the configured request function.
 * @returns {Object} - An object with all the auth payment functions.
 */
export default request => ({
    /**
     * Saves a payment method
     *
     * @param {Object} data object with payment method nonce.
     * @param {String} data.payment_nonce the payment method's Stripe token.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a payment method object if successful.
     */
    savePaymentMethod: (data, token) =>
        request({
            verb: "POST",
            endpoint: "api/v1/payment/methods/",
            data,
            token,
        }),
    /**
     * Retrieves a user's payment method list.
     *
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a user.
     */
    getPaymentMethodList: token =>
        request({
            endpoint: "api/v1/payment/methods/",
            token,
        }),
    /**
     * Edits a payment method object.
     *
     * @param {String} paymentId id of the method object to edit.
     * @param {Object} data payment method details to edit.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a payment funding if successful.
     */
    editPaymentMethod: (paymentId, data, token) =>
        request({
            verb: "PATCH",
            endpoint: `api/v1/payment/methods/${paymentId}/`,
            data,
            token,
        }),
    /**
     * Deletes a payment method object.
     *
     * @param {String} paymentId id of the method to delete.
     * @param {String} token user's authentication token.
     *
     * @returns {void}
     */
    deletePaymentMethod: (paymentId, token) =>
        request({
            verb: "DELETE",
            endpoint: `api/v1/payment/methods/${paymentId}/`,
            token,
        }),
    /**
     * Creates a new merchant.
     *
     * @param {Object} data merchant details.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a merchant if successful.
     */
    createMerchant: (data, token) =>
        request({
            verb: "POST",
            endpoint: "api/v1/payment/merchant/onboarding/",
            token,
            data,
        }),
    /**
     * Fetch a service provider's merchant details.
     *
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a merchant if successful.
     */
    getMerchantDetails: token =>
        request({
            endpoint: "api/v1/payment/merchant/me/",
            token,
        }),
    /**
     * Edit merchant details.
     *
     * @param {Object} data merchant details.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a merchant if successful.
     */
    editMerchantDetails: (data, token) =>
        request({
            verb: "PATCH",
            endpoint: "api/v1/payment/merchant/me/",
            token,
            data,
        }),
    /**
     * Creates a new payment funding.
     *
     * @param {Object} data payment funding details.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a payment funding if successful.
     */
    createPaymentFunding: (data, token) =>
        request({
            verb: "POST",
            endpoint: "api/v1/payment/fundings/",
            data,
            token,
        }),
    /**
     * Edits a payment funding object.
     *
     * @param {String} fundingId id of the funding object to edit.
     * @param {Object} data payment funding details to edit.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a payment funding if successful.
     */
    editPaymentFunding: (fundingId, data, token) =>
        request({
            verb: "PATCH",
            endpoint: `api/v1/payment/fundings/${fundingId}/`,
            data,
            token,
        }),
    /**
     * Retrieves a user's list of payment funding options.
     *
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a list of payment funding object if success.
     */
    getPaymentFundingList: token =>
        request({
            endpoint: "api/v1/payment/fundings/",
            token,
        }),
    /**
     * Deletes a payment funding object.
     *
     * @param {String} fundingId id of the funding object to edit.
     * @param {String} token user's authentication token.
     *
     * @returns {void}
     */
    deletePaymentFunding: (fundingId, token) =>
        request({
            verb: "DELETE",
            endpoint: `api/v1/payment/fundings/${fundingId}/`,
            token,
        }),
    /**
     * Creates a new payout.
     *
     * @param {Object} data payout details.
     * @param {String} token user's authentication token.
     *
     * @returns {Promise} resolves to a payout if successful.
     */
    createPayout: (data, token) =>
        request({
            verb: "POST",
            endpoint: "api/v1/payment/payouts/",
            data,
            token,
        }),
    /**
     * Creates a tip charge to be processed.
     *
     * @param {Object} data description of the tip.
     * @param {Number} data.amount tip's amount
     * @param {String} data.customer_account uuid of the user leaving the tip.
     * @param {String} data.merchant_account uuid of the user receiving the tip.
     * @param {String} data.source uuid of the payment method used.
     * @param {String} token user's authentication token.
     *
     * @return {Promise} resolves to the newly created tip if successful
     */
    createTipCharge: (data, token) =>
        request({
            verb: "POST",
            endpoint: "api/v1/payment/tips/",
            data,
            token,
        }),
});
