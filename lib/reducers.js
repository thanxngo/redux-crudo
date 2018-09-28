"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.apiReducer = apiReducer;

var _immutable = require("immutable");

var _actions = require("./actions");

var _utils = require("./utils");

var noErrorsState = {
    error: false,
    errors: {},
    loading: false
};

/**
 * Arrange items by UUID
 * @param {Map} list - list of objects
 *
 * @return {Map} sorted list of objects
 */
function byId(list) {
    return (0, _immutable.Map)(list.map(function (item) {
        return [item.uuid, item];
    }));
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
function apiReducer(resource) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var actions = (0, _actions.apiActions)(resource, methods);
    var initialState = {
        args: {},
        item: {},
        items: new _immutable.Map(),
        error: false,
        errors: {},
        loading: false,
        status: "",
        statusCode: 0
    };
    var sortItems = options.sortItems;


    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];
        var payload = action.payload;
        // Basic actions

        switch (action.type) {
            case actions.SET_ITEM:
                return _extends({}, state, {
                    item: payload
                });
            case actions.CLEAR_ITEM:
                return _extends({}, state, {
                    item: {}
                });
            case actions.CLEAR_ERRORS:
                return _extends({}, state, noErrorsState);
        }
        // Create action
        if (methods & _utils.CREATE) {
            switch (action.type) {
                case actions.CREATE_REQUEST:
                    return _extends({}, state, noErrorsState, {
                        args: payload || {},
                        loading: true,
                        status: "create_request"
                    });
                case actions.CREATE_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: payload.data,
                        status: "create_success",
                        statusCode: payload.statusCode
                    });
                case actions.CREATE_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "create_failure",
                        statusCode: payload.statusCode
                    });
            }
        }
        // Read action
        if (methods & _utils.READ) {
            switch (action.type) {
                case actions.READ_REQUEST:
                    return _extends({}, initialState, {
                        args: payload || {},
                        status: "read_request",
                        loading: true
                    });
                case actions.READ_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: payload.data,
                        status: "read_success",
                        statusCode: payload.statusCode
                    });
                case actions.READ_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "read_failure",
                        statusCode: payload.statusCode
                    });
            }
        }
        // Update actions
        if (methods & _utils.UPDATE) {
            switch (action.type) {
                case actions.UPDATE_REQUEST:
                    {
                        return _extends({}, state, noErrorsState, {
                            args: payload || {},
                            loading: true,
                            status: "update_request"
                        });
                    }
                case actions.UPDATE_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: payload.data,
                        status: "update_success",
                        statusCode: payload.statusCode
                    });
                case actions.UPDATE_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "update_failure",
                        statusCode: payload.statusCode
                    });
            }
        }
        // Delete actions
        if (methods & _utils.DELETE) {
            switch (action.type) {
                case actions.DELETE_REQUEST:
                    return _extends({}, state, noErrorsState, {
                        args: payload || {},
                        status: "delete_request",
                        loading: true
                    });
                case actions.DELETE_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        status: "delete_success",
                        statusCode: payload.statusCode
                    });
                case actions.DELETE_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "delete_failure",
                        statusCode: payload.statusCode
                    });
            }
        }
        // List actions
        if (methods & _utils.LIST) {
            switch (action.type) {
                case actions.LIST_REQUEST:
                    return _extends({}, state, {
                        args: payload || {},
                        loading: true,
                        status: "list_request"
                    });
                case actions.LIST_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        items: sortItems ? sortItems(payload.data) : byId(payload.data),
                        status: "list_success",
                        statusCode: payload.statusCode
                    });
                case actions.LIST_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "list_failure",
                        statusCode: payload.statusCode
                    });
            }
        }
        // Post actions
        if (methods & _utils.POST) {
            switch (action.type) {
                case actions.POST_REQUEST:
                    return _extends({}, state, {
                        args: payload || {},
                        loading: true,
                        status: "post_request"
                    });
                case actions.POST_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: payload.data || {},
                        status: "post_success",
                        statusCode: payload.statusCode
                    });
                case actions.POST_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errors: payload.data,
                        loading: false,
                        status: "post_failure",
                        statusCode: payload.statusCode
                    });
            }
        }
        return state;
    };
}