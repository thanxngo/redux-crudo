/*
 * Generic reducer for CRUDL operations.
 */
import update from "immutability-helper";

import { apiActionTypes, basicActionTypes } from "./actions";

/**
 * Arrange items by UUID
 */
function byId(list) {
    const items = new Map();
    list.forEach(item => {
        items.set(item.uuid, item);
    });
    return items;
}

const noErrorsState = {
    error: false,
    errorCode: 0,
    errors: {},
    loading: false,
};

/**
 * TODO
 */
export function apiReducer(resource, methods = "crudlp", options = {}) {
    const actions = apiActionTypes(resource, methods);
    const basicActions = basicActionTypes(resource);
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
            case basicActions.SET_ITEM:
                return {
                    ...state,
                    item: payload,
                };
            case basicActions.CLEAR_ITEM:
                return {
                    ...state,
                    item: {},
                };
            case basicActions.CLEAR_ERRORS:
                return {
                    ...state,
                    error: false,
                    errorCode: 0,
                    errors: {},
                };
            default:
        }
        // Create action
        if (methods.indexOf("c") > -1) {
            switch (action.type) {
                case actions.CREATE_REQUEST:
                    return {
                        ...state,
                        ...noErrorsState,
                        item: payload.data || {},
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
        if (methods.indexOf("r") > -1) {
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
        if (methods.indexOf("u") > -1) {
            switch (action.type) {
                case actions.UPDATE_REQUEST: {
                    // Optimistic Updates:
                    const id = payload.id;
                    let newItem = null;
                    let newItems = new Map();
                    if (id && state.items && state.items.has(id)) {
                        // Update items list
                        const item = state.items.get(id);
                        newItem = {
                            ...item,
                            ...payload.data,
                        };
                        newItems = update(state.items, {
                            [id]: { $set: newItem },
                        });
                    }
                    if (state.item) {
                        // Update current item
                        newItem = {
                            ...state.item,
                            ...payload.data,
                        };
                    }
                    return {
                        ...state,
                        ...noErrorsState,
                        item: newItem || {},
                        items: newItems,
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
        // List actions
        if (methods.indexOf("l") > -1) {
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
        if (methods.indexOf("p") > -1) {
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
        // Create action
        if (methods.indexOf("d") > -1) {
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
        return state;
    };
}
