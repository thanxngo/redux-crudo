import update from "immutability-helper";
import { Map } from "immutable";

import { apiActions } from "./actions";
import { CREATE, READ, UPDATE, DELETE, LIST, POST } from "./utils";

const noErrorsState = {
    error: false,
    errorCode: 0,
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
        errorCode: 0,
        loading: false,
        status: "",
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
                    error: false,
                    errorCode: 0,
                    errors: {},
                };
            default:
        }
        // Create action
        if (methods & CREATE) {
            switch (action.type) {
                case actions.CREATE_REQUEST:
                    return {
                        ...state,
                        ...noErrorsState,
                        args: payload || {},
                        status: "create_request",
                        loading: true,
                    };
                case actions.CREATE_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        item: payload,
                        status: "create_success",
                    };
                case actions.CREATE_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "create_failure",
                    };
                default:
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
                        item: payload,
                        status: "read_success",
                    };
                case actions.READ_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "read_failure",
                    };
                default:
            }
        }
        // Update actions
        if (methods & UPDATE) {
            switch (action.type) {
                case actions.UPDATE_REQUEST: {
                    return {
                        ...state,
                        ...noErrorsState,
                        loading: true,
                        status: "update_request",
                    };
                }
                case actions.UPDATE_SUCCESS:
                    return {
                        ...state,
                        ...noErrorsState,
                        item: action.payload,
                        status: "update_success",
                    };
                case actions.UPDATE_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "update_failure",
                    };
                default:
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
                    };
                case actions.DELETE_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "delete_failure",
                    };
                default:
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
                        items: sortItems ? sortItems(payload) : byId(payload),
                        status: "list_success",
                    };
                case actions.LIST_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "list_failure",
                    };
                default:
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
                        item: payload || {},
                        status: "post_success",
                    };
                case actions.POST_FAILURE:
                    return {
                        ...state,
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "post_failure",
                    };
                default:
            }
        }
        return state;
    };
}
