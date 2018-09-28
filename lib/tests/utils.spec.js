"use strict";

var _utils = require("../utils");

describe("Utils", function () {
    it("should return namespace", function () {
        var namespace = (0, _utils.getns)("mojo");
        expect(namespace("CREATE")).toEqual("mojo/CREATE");
    });
}); /* eslint-env jest */