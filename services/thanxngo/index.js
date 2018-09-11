import axios from "axios";

import * as AccountService from "./account";
import * as AuthService from "./auth";
import * as ExperienceService from "./experience";
import * as FeedbackService from "./feedback";
import * as FollowService from "./follow";
import * as GeolocationService from "./geolocation";
import * as HistoryService from "./history";
import * as PaymentService from "./payment";

/**
 * Function that returns the base request function.
 * @param {String} baseApiUrl - The base api url
 * @returns {Function} - The request function.
 */
export async function makeRequest(baseApiUrl) {
    /**
     * Base request method for all the calls in this service. It takes a single
     * options Object as an argument
     *
     * @param {String}  options.endpoint Thanxngo API endpoint for the request.
     * @param {String}  options.verb HTTP verb.
     * @param {Object}  options.body Body of the request.
     * @param {Boolean} options.https Whether or not the request uses HTTPS.
     * @param {Object}  options.headers The request's headers.
     * @param {Object}  options.token Auth token
     *
     * @returns {Promise}  A promise.
     */
    return async ({ endpoint, verb = "GET", data, headers, token }) => {
        const options = {
            method: verb,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
        };

        if (token) {
            options.headers = {
                ...options.headers,
                Authorization: `token ${token}`,
            };
        }

        if (data) {
            options.data = data;
        }

        try {
            const res = await axios(`${baseApiUrl}/${endpoint}`, options);
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };
}

/**
 * Function used to configure and return Thanxngo services.
 * @param {String} baseApiUrl - The base api url.
 * @returns {Object} - The services configured with the base api url.
 */
export default function(baseApiUrl) {
    const requestFunction = makeRequest(baseApiUrl);
    return {
        AccountService: AccountService(requestFunction),
        AuthService: AuthService(requestFunction),
        ExperienceService: ExperienceService(requestFunction),
        FeedbackService: FeedbackService(requestFunction),
        FollowService: FollowService(requestFunction),
        GeolocationService: GeolocationService(requestFunction),
        HistoryService: HistoryService(requestFunction),
        PaymentService: PaymentService(requestFunction),
    };
}
