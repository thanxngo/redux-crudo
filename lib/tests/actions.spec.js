"use strict";

var _actions = require("../actions");

var _utils = require("../utils");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-env jest */
/* eslint prefer-promise-reject-errors: 0 */

describe("Redux api actions", function () {
    describe("getActionName", function () {
        it("should match the correct action name", function () {
            expect((0, _actions.getActionName)(_utils.CREATE)).toEqual("create");
            expect((0, _actions.getActionName)(_utils.READ)).toEqual("read");
            expect((0, _actions.getActionName)(_utils.UPDATE)).toEqual("update");
            expect((0, _actions.getActionName)(_utils.DELETE)).toEqual("delete");
            expect((0, _actions.getActionName)(_utils.LIST)).toEqual("list");
            expect((0, _actions.getActionName)(_utils.POST)).toEqual("post");
            expect(function () {
                return (0, _actions.getActionName)(0);
            }).toThrow();
        });
    });

    describe("apiActions errors", function () {
        it("should throw on bad parameters.", function () {
            expect(function () {
                return (0, _actions.apiActions)(null);
            }).toThrow();
            expect(function () {
                return (0, _actions.apiActions)("");
            }).toThrow();
            expect(function () {
                return (0, _actions.apiActions)("  ");
            }).toThrow();
        });
    });

    describe("apiActions basic actions", function () {
        it("should create basic actions", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO");
            expect(mojoActions.SET_ITEM).toEqual("MOJO_SET_ITEM");
            expect(mojoActions.CLEAR_ITEM).toEqual("MOJO_CLEAR_ITEM");
            expect(mojoActions.CLEAR_ERRORS).toEqual("MOJO_CLEAR_ERRORS");
            expect(mojoActions.setItem("data")).toEqual({
                type: mojoActions.SET_ITEM,
                payload: "data"
            });
            expect(mojoActions.clearItem()).toEqual({
                type: mojoActions.CLEAR_ITEM
            });
            expect(mojoActions.clearErrors()).toEqual({
                type: mojoActions.CLEAR_ERRORS
            });
        });
    });

    describe("apiActions crud actions", function () {
        it("should create CREATE resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE);
            expect(mojoActions.CREATE_REQUEST).toEqual("MOJO_CREATE_REQUEST");
            expect(mojoActions.createRequest("data")).toEqual({
                type: mojoActions.CREATE_REQUEST,
                payload: "data"
            });
            expect(mojoActions.CREATE_SUCCESS).toEqual("MOJO_CREATE_SUCCESS");
            expect(mojoActions.createSuccess(200, "success")).toEqual({
                type: mojoActions.CREATE_SUCCESS,
                payload: { data: "success", statusCode: 200 }
            });
            expect(mojoActions.CREATE_FAILURE).toEqual("MOJO_CREATE_FAILURE");
            expect(mojoActions.createFailure(400, "error")).toEqual({
                type: mojoActions.CREATE_FAILURE,
                payload: { data: "error", statusCode: 400 }
            });
        });

        it("should NOT create CREATE resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.READ | _utils.UPDATE | _utils.DELETE | _utils.LIST | _utils.POST);
            expect(mojoActions.CREATE_REQUEST).toBe(undefined);
            expect(mojoActions.CREATE_SUCCESS).toBe(undefined);
            expect(mojoActions.CREATE_FAILURE).toBe(undefined);
        });

        it("should create READ resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.READ);
            expect(mojoActions.READ_REQUEST).toEqual("MOJO_READ_REQUEST");
            expect(mojoActions.readRequest("data")).toEqual({
                type: mojoActions.READ_REQUEST,
                payload: "data"
            });
            expect(mojoActions.READ_SUCCESS).toEqual("MOJO_READ_SUCCESS");
            expect(mojoActions.readSuccess(200, "success")).toEqual({
                type: mojoActions.READ_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200
                }
            });
            expect(mojoActions.READ_FAILURE).toEqual("MOJO_READ_FAILURE");
            expect(mojoActions.readFailure(400, "error.")).toEqual({
                type: mojoActions.READ_FAILURE,
                payload: {
                    data: "error.",
                    statusCode: 400
                }
            });
        });

        it("should NOT create READ resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE | _utils.UPDATE | _utils.DELETE | _utils.LIST | _utils.POST);
            expect(mojoActions.READ_REQUEST).toBe(undefined);
            expect(mojoActions.READ_SUCCESS).toBe(undefined);
            expect(mojoActions.READ_FAILURE).toBe(undefined);
        });

        it("should create UPDATE resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.UPDATE);
            expect(mojoActions.UPDATE_REQUEST).toEqual("MOJO_UPDATE_REQUEST");
            expect(mojoActions.updateRequest("data")).toEqual({
                type: mojoActions.UPDATE_REQUEST,
                payload: "data"
            });
            expect(mojoActions.UPDATE_SUCCESS).toEqual("MOJO_UPDATE_SUCCESS");
            expect(mojoActions.updateSuccess(200, "success")).toEqual({
                type: mojoActions.UPDATE_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200
                }
            });
            expect(mojoActions.UPDATE_FAILURE).toEqual("MOJO_UPDATE_FAILURE");
            expect(mojoActions.updateFailure(400, "Couldn't update.")).toEqual({
                type: mojoActions.UPDATE_FAILURE,
                payload: {
                    data: "Couldn't update.",
                    statusCode: 400
                }
            });
        });

        it("should NOT create UPDATE resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE | _utils.READ | _utils.DELETE | _utils.LIST | _utils.POST);
            expect(mojoActions.UPDATE_REQUEST).toBe(undefined);
            expect(mojoActions.UPDATE_SUCCESS).toBe(undefined);
            expect(mojoActions.UPDATE_FAILURE).toBe(undefined);
        });

        it("should create DELETE resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.DELETE);
            expect(mojoActions.DELETE_REQUEST).toEqual("MOJO_DELETE_REQUEST");
            expect(mojoActions.deleteRequest("request")).toEqual({
                type: mojoActions.DELETE_REQUEST,
                payload: "request"
            });
            expect(mojoActions.DELETE_SUCCESS).toEqual("MOJO_DELETE_SUCCESS");
            expect(mojoActions.deleteSuccess(204, "success")).toEqual({
                type: mojoActions.DELETE_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 204
                }
            });
            expect(mojoActions.DELETE_FAILURE).toEqual("MOJO_DELETE_FAILURE");
            expect(mojoActions.deleteFailure(400, "Couldn't delete.")).toEqual({
                type: mojoActions.DELETE_FAILURE,
                payload: {
                    data: "Couldn't delete.",
                    statusCode: 400
                }
            });
        });

        it("should NOT create DELETE resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE | _utils.READ | _utils.UPDATE | _utils.LIST | _utils.POST);
            expect(mojoActions.DELETE_REQUEST).toBe(undefined);
            expect(mojoActions.DELETE_SUCCESS).toBe(undefined);
            expect(mojoActions.DELETE_FAILURE).toBe(undefined);
        });

        it("should create LIST resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.LIST);
            expect(mojoActions.LIST_REQUEST).toEqual("MOJO_LIST_REQUEST");
            expect(mojoActions.listRequest("request")).toEqual({
                type: mojoActions.LIST_REQUEST,
                payload: "request"
            });
            expect(mojoActions.LIST_SUCCESS).toEqual("MOJO_LIST_SUCCESS");
            expect(mojoActions.listSuccess(200, "success")).toEqual({
                type: mojoActions.LIST_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200
                }
            });
            expect(mojoActions.LIST_FAILURE).toEqual("MOJO_LIST_FAILURE");
            expect(mojoActions.listFailure(400, "Couldn't list.")).toEqual({
                type: mojoActions.LIST_FAILURE,
                payload: {
                    data: "Couldn't list.",
                    statusCode: 400
                }
            });
        });

        it("should NOT create LIST resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE | _utils.READ | _utils.UPDATE | _utils.DELETE | _utils.POST);
            expect(mojoActions.LIST_REQUEST).toBe(undefined);
            expect(mojoActions.LIST_SUCCESS).toBe(undefined);
            expect(mojoActions.LIST_FAILURE).toBe(undefined);
        });

        it("should create POST resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.POST);
            expect(mojoActions.POST_REQUEST).toEqual("MOJO_POST_REQUEST");
            expect(mojoActions.postRequest("request")).toEqual({
                type: mojoActions.POST_REQUEST,
                payload: "request"
            });
            expect(mojoActions.POST_SUCCESS).toEqual("MOJO_POST_SUCCESS");
            expect(mojoActions.postSuccess(200, "success")).toEqual({
                type: mojoActions.POST_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200
                }
            });
            expect(mojoActions.POST_FAILURE).toEqual("MOJO_POST_FAILURE");
            expect(mojoActions.postFailure(400, "Couldn't post.")).toEqual({
                type: mojoActions.POST_FAILURE,
                payload: {
                    data: "Couldn't post.",
                    statusCode: 400
                }
            });
        });

        it("should NOT create POST resource group", function () {
            var mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE | _utils.READ | _utils.UPDATE | _utils.DELETE | _utils.LIST);
            expect(mojoActions.POST_REQUEST).toBe(undefined);
            expect(mojoActions.POST_SUCCESS).toBe(undefined);
            expect(mojoActions.POST_FAILURE).toBe(undefined);
        });
    });

    describe("Action assignCrudMethod", function () {
        it("should dispatch success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var mojoActions, mockedApi, spy;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE);
                            mockedApi = {
                                create: function create() {
                                    return Promise.resolve({ status: 200, data: "created" });
                                }
                            };
                            spy = jest.fn();

                            mojoActions.create = (0, _actions.assignCrudMethod)(mojoActions, mockedApi.create, _utils.CREATE);
                            _context.next = 6;
                            return mojoActions.create()(spy);

                        case 6:
                            expect(spy).toHaveBeenCalledWith({
                                type: "MOJO_CREATE_SUCCESS",
                                payload: { statusCode: 200, data: "created" }
                            });

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it("should dispatch error", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var mojoActions, mockedApi, spy;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            mojoActions = (0, _actions.apiActions)("MOJO", _utils.CREATE);
                            mockedApi = {
                                create: function create() {
                                    return Promise.reject({
                                        response: { status: 404, data: "Not found." }
                                    });
                                }
                            };
                            spy = jest.fn();

                            mojoActions.create = (0, _actions.assignCrudMethod)(mojoActions, mockedApi.create, _utils.CREATE);
                            _context2.next = 6;
                            return mojoActions.create()(spy);

                        case 6:
                            expect(spy).toHaveBeenCalledWith({
                                type: "MOJO_CREATE_FAILURE",
                                payload: {
                                    data: "Not found.",
                                    statusCode: 404
                                }
                            });

                        case 7:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));
    });
});