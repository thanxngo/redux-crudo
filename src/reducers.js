import { Map } from "immutable";

import { apiActions } from "./actions";
import { CREATE, READ, UPDATE, DELETE, LIST, POST } from "./utils";

const noErrorsState = {
    error: false,
    errors: {},
    loading: false,
};

/**
 * Arrange items by UUID
 * @param {Map} list - list of objects
 *
 * @return {Map} sorted list of objects
 */
function byId(list) {
    return Map(list.map(item => [item.uuid, item]));
}

/**
 * Return a generic reducer for API actions.
 *
 * @param {string} resource - Name of the resource with prefix
 * @param {number} methods - Combinaison of (CREATE, READ, UPDATE, DELETE, LIST, POST)
 * @param {Object} options - Set of options
 *
 * @returns {function} Reducer function.
 */
export function apiReducer(resource, methods = 0, options = {}) {
    const actions = apiActions(resource, methods);
    const initialState = {
        args: {},
        item: {},
        items: new Map(),
        error: false,
        errors: {},
        loading: false,
        status: "",
        statusCode: 0,
    };
    const {
        // Function that sort items returned by list.
        sortItems,
    } = options;

    return (state = initialState, action) => {
        const { payload } = action;
        // Basic actions
        switch (action.type) {
            case actions.SET_ITEM:
                return {
                    ...state,
                    item: payload,
                };
            case actions.CLEAR_ITEM:
                return {
                    ...state,
                    item: {},
                };
            case actions.CLEAR_ERRORS:
                return {
                    ...state,
                    ...noErrorsState,
                };
        }
        // Create action
        if (methods & CREATE) {
            switch (action.type) {
                case actions.CREATE_REQUEST:
                    return {
                        ...state,
                        ...noErrorsState,
                        args: payload || {},
                        loading: true,
                        status: "create_request",
                    };
                case actions.CREATE_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        item: payload.data,
                        status: "create_success",
                        statusCode: payload.statusCode,
                    };
                case actions.CREATE_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "create_failure",
                        statusCode: payload.statusCode,
                    };
            }
        }
        // Read action
        if (methods & READ) {
            switch (action.type) {
                case actions.READ_REQUEST:
                    return {
                        ...initialState,
                        args: payload || {},
                        status: "read_request",
                        loading: true,
                    };
                case actions.READ_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        item: payload.data,
                        status: "read_success",
                        statusCode: payload.statusCode,
                    };
                case actions.READ_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "read_failure",
                        statusCode: payload.statusCode,
                    };
            }
        }
        // Update actions
        if (methods & UPDATE) {
            switch (action.type) {
                case actions.UPDATE_REQUEST: {
                    return {
                        ...state,
                        ...noErrorsState,
                        args: payload || {},
                        loading: true,
                        status: "update_request",
                    };
                }
                case actions.UPDATE_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        item: payload.data,
                        status: "update_success",
                        statusCode: payload.statusCode,
                    };
                case actions.UPDATE_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "update_failure",
                        statusCode: payload.statusCode,
                    };
            }
        }
        // Delete actions
        if (methods & DELETE) {
            switch (action.type) {
                case actions.DELETE_REQUEST:
                    return {
                        ...state,
                        ...noErrorsState,
                        args: payload || {},
                        status: "delete_request",
                        loading: true,
                    };
                case actions.DELETE_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        status: "delete_success",
                        statusCode: payload.statusCode,
                    };
                case actions.DELETE_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "delete_failure",
                        statusCode: payload.statusCode,
                    };
            }
        }
        // List actions
        if (methods & LIST) {
            switch (action.type) {
                case actions.LIST_REQUEST:
                    return {
                        ...state,
                        args: payload || {},
                        loading: true,
                        status: "list_request",
                    };
                case actions.LIST_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        items: sortItems
                            ? sortItems(payload.data)
                            : byId(payload.data),
                        status: "list_success",
                        statusCode: payload.statusCode,
                    };
                case actions.LIST_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "list_failure",
                        statusCode: payload.statusCode,
                    };
            }
        }
        // Post actions
        if (methods & POST) {
            switch (action.type) {
                case actions.POST_REQUEST:
                    return {
                        ...state,
                        args: payload || {},
                        loading: true,
                        status: "post_request",
                    };
                case actions.POST_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        item: payload.data || {},
                        status: "post_success",
                        statusCode: payload.statusCode,
                    };
                case actions.POST_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "post_failure",
                        statusCode: payload.statusCode,
                    };
            }
        }
        return state;
    };
}
