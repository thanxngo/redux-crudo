"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.POST = exports.LIST = exports.DELETE = exports.UPDATE = exports.READ = exports.CREATE = exports.getns = exports.assignCrudMethod = exports.apiReducer = exports.apiActions = exports.BaseApiReducerType = undefined;

var _actions = require("./actions");

var _reducers = require("./reducers");

var _types = require("./types");

var _utils = require("./utils");

exports.BaseApiReducerType = _types.BaseApiReducerType;
exports.apiActions = _actions.apiActions;
exports.apiReducer = _reducers.apiReducer;
exports.assignCrudMethod = _actions.assignCrudMethod;
exports.getns = _utils.getns;
exports.CREATE = _utils.CREATE;
exports.READ = _utils.READ;
exports.UPDATE = _utils.UPDATE;
exports.DELETE = _utils.DELETE;
exports.LIST = _utils.LIST;
exports.POST = _utils.POST;