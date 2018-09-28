"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseApiReducerType = undefined;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseApiReducerType = _propTypes2.default.shape({
    args: _propTypes2.default.object.isRequired,
    item: _propTypes2.default.object.isRequired,
    items: _propTypes2.default.object.isRequired,
    error: _propTypes2.default.bool.isRequired,
    errorCode: _propTypes2.default.number.isRequired,
    errors: _propTypes2.default.object.isRequired,
    loading: _propTypes2.default.bool.isRequired,
    status: _propTypes2.default.string
}); /* eslint-disable react/forbid-prop-types */
exports.BaseApiReducerType = BaseApiReducerType;