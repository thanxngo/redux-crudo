"use strict";

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Index", function () {
    it("should export package", function () {
        expect(JSON.stringify(_index2.default)).toMatchSnapshot();
    });
}); /* eslint-env jest */