"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.apiReducer = apiReducer;

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _immutable = require("immutable");

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Arrange items by UUID
 */
function byId(list) {
    return (0, _immutable.Map)(list.map(function (item) {
        return [item.uuid, item];
    }));
}

var noErrorsState = {
    error: false,
    errorCode: 0,
    errors: {},
    loading: false
};

/**
 * TODO
 */
function apiReducer(resource) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "crudlp";
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var actions = (0, _actions.apiActionTypes)(resource, methods);
    var basicActions = (0, _actions.basicActionTypes)(resource);
    var initialState = {
        args: {},
        item: {},
        items: new _immutable.Map(),
        error: false,
        errors: {},
        errorCode: 0,
        loading: false,
        status: ""
    };
    var sortItems = options.sortItems;


    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];
        var payload = action.payload;
        // Basic actions

        switch (action.type) {
            case basicActions.SET_ITEM:
                return _extends({}, state, {
                    item: payload
                });
            case basicActions.CLEAR_ITEM:
                return _extends({}, state, {
                    item: {}
                });
            case basicActions.CLEAR_ERRORS:
                return _extends({}, state, {
                    error: false,
                    errorCode: 0,
                    errors: {}
                });
            default:
        }
        // Create action
        if (methods.indexOf("c") > -1) {
            switch (action.type) {
                case actions.CREATE_REQUEST:
                    return _extends({}, state, noErrorsState, {
                        args: payload || {},
                        status: "create_request",
                        loading: true
                    });
                case actions.CREATE_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: payload,
                        status: "create_success"
                    });
                case actions.CREATE_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "create_failure"
                    });
                default:
            }
        }
        // Read action
        if (methods.indexOf("r") > -1) {
            switch (action.type) {
                case actions.READ_REQUEST:
                    return _extends({}, initialState, {
                        args: payload || {},
                        status: "read_request",
                        loading: true
                    });
                case actions.READ_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: payload,
                        status: "read_success"
                    });
                case actions.READ_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "read_failure"
                    });
                default:
            }
        }
        // Update actions
        if (methods.indexOf("u") > -1) {
            switch (action.type) {
                case actions.UPDATE_REQUEST:
                    {
                        return _extends({}, state, noErrorsState, {
                            loading: true,
                            status: "update_request"
                        });
                    }
                case actions.UPDATE_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: action.payload,
                        status: "update_success"
                    });
                case actions.UPDATE_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "update_failure"
                    });
                default:
            }
        }
        // List actions
        if (methods.indexOf("l") > -1) {
            switch (action.type) {
                case actions.LIST_REQUEST:
                    return _extends({}, state, {
                        args: payload || {},
                        loading: true,
                        status: "list_request"
                    });
                case actions.LIST_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        items: sortItems ? sortItems(payload) : byId(payload),
                        status: "list_success"
                    });
                case actions.LIST_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "list_failure"
                    });
                default:
            }
        }
        // Post actions
        if (methods.indexOf("p") > -1) {
            switch (action.type) {
                case actions.POST_REQUEST:
                    return _extends({}, state, {
                        args: payload || {},
                        loading: true,
                        status: "post_request"
                    });
                case actions.POST_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        item: payload || {},
                        status: "post_success"
                    });
                case actions.POST_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "post_failure"
                    });
                default:
            }
        }
        // Create action
        if (methods.indexOf("d") > -1) {
            switch (action.type) {
                case actions.DELETE_REQUEST:
                    return _extends({}, state, noErrorsState, {
                        args: payload || {},
                        status: "delete_request",
                        loading: true
                    });
                case actions.DELETE_SUCCESS:
                    return _extends({}, state, noErrorsState, {
                        status: "delete_success"
                    });
                case actions.DELETE_FAILURE:
                    return _extends({}, state, {
                        error: true,
                        errorCode: payload.errorCode,
                        errors: payload.errors,
                        loading: false,
                        status: "delete_failure"
                    });
                default:
            }
        }
        return state;
    };
}