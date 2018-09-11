"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require("./actions");

var _reducers = require("./reducers");

var _types = require("./types");

var _utils = require("./utils");

exports.default = {
    apiActionTypes: _actions.apiActionTypes,
    apiReducer: _reducers.apiReducer,
    BaseApiReducerType: _types.BaseApiReducerType,
    basicActionTypes: _actions.basicActionTypes,
    getActionsNameSpace: _utils.getActionsNameSpace
};