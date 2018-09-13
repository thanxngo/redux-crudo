"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.basicActionTypes = basicActionTypes;
exports.apiActionTypes = apiActionTypes;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Generic actions for CRUDL operations
 */

function getGroup(resource, action) {
    var _ref;

    var typeName = "" + action;
    var funcName = "" + action.toLowerCase();
    return _ref = {}, _defineProperty(_ref, typeName + "_REQUEST", resource + "_" + action + "_REQUEST"), _defineProperty(_ref, funcName + "Request", function undefined(payload) {
        return {
            type: resource + "_" + action + "_REQUEST",
            payload: payload
        };
    }), _defineProperty(_ref, typeName + "_SUCCESS", resource + "_" + action + "_SUCCESS"), _defineProperty(_ref, funcName + "Success", function undefined(payload) {
        return {
            type: resource + "_" + action + "_SUCCESS",
            payload: payload
        };
    }), _defineProperty(_ref, typeName + "_FAILURE", resource + "_" + action + "_FAILURE"), _defineProperty(_ref, funcName + "Failure", function undefined(errorCode, errors) {
        return {
            type: resource + "_" + action + "_FAILURE",
            payload: {
                errorCode: errorCode,
                errors: errors
            }
        };
    }), _ref;
}

/**
 * Function that returns basic actions types.
 * @param {String} resource - the resource of the reducer.
 * @returns {Object} - The actions and types.
 */
function basicActionTypes(resource) {
    var actions = {};
    actions.SET_ITEM = resource + "_SET_ITEM";
    actions.setItem = function (payload) {
        return {
            type: actions.SET_ITEM,
            payload: payload
        };
    };
    actions.CLEAR_ITEM = resource + "_CLEAR_ITEM";
    actions.clearItem = function () {
        return {
            type: actions.CLEAR_ITEM
        };
    };
    actions.CLEAR_ERRORS = resource + "_CLEAR_ERRORS";
    actions.clearErrors = function () {
        return {
            type: actions.CLEAR_ERRORS
        };
    };
    return actions;
}

function apiActionTypes(resource) {
    var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "crudlp";

    if (resource === null) throw new Error("Expected resource");
    if (resource.trim() === "") throw new Error("Expected resource");
    var actionTypes = _extends({}, basicActionTypes(resource));

    // CREATE
    if (methods.indexOf("c") > -1) {
        actionTypes = _extends({}, actionTypes, getGroup(resource, "CREATE"));
    }
    // READ
    if (methods.indexOf("r") > -1) {
        actionTypes = _extends({}, actionTypes, getGroup(resource, "READ"));
    }
    // UPDATE
    if (methods.indexOf("u") > -1) {
        actionTypes = _extends({}, actionTypes, getGroup(resource, "UPDATE"));
    }
    // DELETE
    if (methods.indexOf("d") > -1) {
        actionTypes = _extends({}, actionTypes, getGroup(resource, "DELETE"));
    }
    // LIST
    if (methods.indexOf("l") > -1) {
        actionTypes = _extends({}, actionTypes, getGroup(resource, "LIST"));
    }
    // Generic POST action
    if (methods.indexOf("p") > -1) {
        actionTypes = _extends({}, actionTypes, getGroup(resource, "POST"));
    }

    /**
     * Register a new action linked to an api call
     * TODO: make it return a Promise.
     */
    actionTypes.register = function register(name, apiMethod, method) {
        var _this = this;

        var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        // Get request, success, failure actions
        var REQUEST = this[method + "Request"];
        var SUCCESS = this[method + "Success"];
        var FAILURE = this[method + "Failure"];
        this[name] = function (args) {
            return function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
                    var response;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    dispatch(REQUEST(args));
                                    _context.prev = 1;
                                    _context.next = 4;
                                    return apiMethod(args);

                                case 4:
                                    response = _context.sent;

                                    dispatch(SUCCESS(response));
                                    _context.next = 11;
                                    break;

                                case 8:
                                    _context.prev = 8;
                                    _context.t0 = _context["catch"](1);

                                    dispatch(FAILURE(_context.t0.statusCode, _context.t0));

                                case 11:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[1, 8]]);
                }));

                return function (_x3) {
                    return _ref2.apply(this, arguments);
                };
            }();
        };
    };

    return actionTypes;
}