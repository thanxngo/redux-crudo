"use strict";

var _actions = require("../actions");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-env jest */


describe("Redux api actions", function () {
    describe("getGroup", function () {
        it("should create CREATE resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "c");
            expect(mojoActions.CREATE_REQUEST).toEqual("MOJO_CREATE_REQUEST");
            expect(mojoActions.createRequest("request")).toEqual({
                type: mojoActions.CREATE_REQUEST,
                payload: "request"
            });
            expect(mojoActions.CREATE_SUCCESS).toEqual("MOJO_CREATE_SUCCESS");
            expect(mojoActions.createSuccess("success")).toEqual({
                type: mojoActions.CREATE_SUCCESS,
                payload: "success"
            });
            expect(mojoActions.CREATE_FAILURE).toEqual("MOJO_CREATE_FAILURE");
            expect(mojoActions.createFailure("failure", "oops")).toEqual({
                type: mojoActions.CREATE_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "oops"
                }
            });
        });

        it("should NOT create CREATE resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "rudlp");
            expect(mojoActions.CREATE_REQUEST).toBe(undefined);
            expect(mojoActions.CREATE_SUCCESS).toBe(undefined);
            expect(mojoActions.CREATE_FAILURE).toBe(undefined);
        });

        it("should create READ resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "r");
            expect(mojoActions.READ_REQUEST).toEqual("MOJO_READ_REQUEST");
            expect(mojoActions.readRequest("request")).toEqual({
                type: mojoActions.READ_REQUEST,
                payload: "request"
            });
            expect(mojoActions.READ_SUCCESS).toEqual("MOJO_READ_SUCCESS");
            expect(mojoActions.readSuccess("success")).toEqual({
                type: mojoActions.READ_SUCCESS,
                payload: "success"
            });
            expect(mojoActions.READ_FAILURE).toEqual("MOJO_READ_FAILURE");
            expect(mojoActions.readFailure("failure", "Couldn't read.")).toEqual({
                type: mojoActions.READ_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't read."
                }
            });
        });

        it("should NOT create READ resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "cudlp");
            expect(mojoActions.READ_REQUEST).toBe(undefined);
            expect(mojoActions.READ_SUCCESS).toBe(undefined);
            expect(mojoActions.READ_FAILURE).toBe(undefined);
        });

        it("should create UPDATE resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "u");
            expect(mojoActions.UPDATE_REQUEST).toEqual("MOJO_UPDATE_REQUEST");
            expect(mojoActions.updateRequest("request")).toEqual({
                type: mojoActions.UPDATE_REQUEST,
                payload: "request"
            });
            expect(mojoActions.UPDATE_SUCCESS).toEqual("MOJO_UPDATE_SUCCESS");
            expect(mojoActions.updateSuccess("success")).toEqual({
                type: mojoActions.UPDATE_SUCCESS,
                payload: "success"
            });
            expect(mojoActions.UPDATE_FAILURE).toEqual("MOJO_UPDATE_FAILURE");
            expect(mojoActions.updateFailure("failure", "Couldn't update.")).toEqual({
                type: mojoActions.UPDATE_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't update."
                }
            });
        });

        it("should NOT create UPDATE resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "crdlp");
            expect(mojoActions.UPDATE_REQUEST).toBe(undefined);
            expect(mojoActions.UPDATE_SUCCESS).toBe(undefined);
            expect(mojoActions.UPDATE_FAILURE).toBe(undefined);
        });

        it("should create DELETE resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "d");
            expect(mojoActions.DELETE_REQUEST).toEqual("MOJO_DELETE_REQUEST");
            expect(mojoActions.deleteRequest("request")).toEqual({
                type: mojoActions.DELETE_REQUEST,
                payload: "request"
            });
            expect(mojoActions.DELETE_SUCCESS).toEqual("MOJO_DELETE_SUCCESS");
            expect(mojoActions.deleteSuccess("success")).toEqual({
                type: mojoActions.DELETE_SUCCESS,
                payload: "success"
            });
            expect(mojoActions.DELETE_FAILURE).toEqual("MOJO_DELETE_FAILURE");
            expect(mojoActions.deleteFailure("failure", "Couldn't delete.")).toEqual({
                type: mojoActions.DELETE_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't delete."
                }
            });
        });

        it("should NOT create DELETE resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "crulp");
            expect(mojoActions.DELETE_REQUEST).toBe(undefined);
            expect(mojoActions.DELETE_SUCCESS).toBe(undefined);
            expect(mojoActions.DELETE_FAILURE).toBe(undefined);
        });

        it("should create LIST resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "l");
            expect(mojoActions.LIST_REQUEST).toEqual("MOJO_LIST_REQUEST");
            expect(mojoActions.listRequest("request")).toEqual({
                type: mojoActions.LIST_REQUEST,
                payload: "request"
            });
            expect(mojoActions.LIST_SUCCESS).toEqual("MOJO_LIST_SUCCESS");
            expect(mojoActions.listSuccess("success")).toEqual({
                type: mojoActions.LIST_SUCCESS,
                payload: "success"
            });
            expect(mojoActions.LIST_FAILURE).toEqual("MOJO_LIST_FAILURE");
            expect(mojoActions.listFailure("failure", "Couldn't list.")).toEqual({
                type: mojoActions.LIST_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't list."
                }
            });
        });

        it("should NOT create LIST resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "crudp");
            expect(mojoActions.LIST_REQUEST).toBe(undefined);
            expect(mojoActions.LIST_SUCCESS).toBe(undefined);
            expect(mojoActions.LIST_FAILURE).toBe(undefined);
        });

        it("should create POST resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "p");
            expect(mojoActions.POST_REQUEST).toEqual("MOJO_POST_REQUEST");
            expect(mojoActions.postRequest("request")).toEqual({
                type: mojoActions.POST_REQUEST,
                payload: "request"
            });
            expect(mojoActions.POST_SUCCESS).toEqual("MOJO_POST_SUCCESS");
            expect(mojoActions.postSuccess("success")).toEqual({
                type: mojoActions.POST_SUCCESS,
                payload: "success"
            });
            expect(mojoActions.POST_FAILURE).toEqual("MOJO_POST_FAILURE");
            expect(mojoActions.postFailure("failure", "Couldn't post.")).toEqual({
                type: mojoActions.POST_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't post."
                }
            });
        });

        it("should NOT create POST resource group", function () {
            var mojoActions = (0, _actions.apiActionTypes)("MOJO", "crudl");
            expect(mojoActions.POST_REQUEST).toBe(undefined);
            expect(mojoActions.POST_SUCCESS).toBe(undefined);
            expect(mojoActions.POST_FAILURE).toBe(undefined);
        });
    });

    describe("Action types register", function () {
        it("should dispatch success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var mojoActions, mockedApi, spy;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            mojoActions = (0, _actions.apiActionTypes)("MOJO", "c");
                            mockedApi = {
                                create: function create() {
                                    return Promise.resolve({ status: "ok", data: "created" });
                                }
                            };
                            spy = jest.fn();

                            mojoActions.register("create", mockedApi.create, "create");
                            _context.next = 6;
                            return mojoActions.create()(spy);

                        case 6:
                            expect(spy).toHaveBeenCalledWith({
                                type: "MOJO_CREATE_SUCCESS",
                                payload: "created"
                            });

                        case 7:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it("should dispatch error", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var mojoActions, errorResponse, mockedApi, spy;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            mojoActions = (0, _actions.apiActionTypes)("MOJO", "c");
                            errorResponse = { statusCode: "404", error: "Not found." };
                            mockedApi = {
                                create: function create() {
                                    return Promise.resolve(errorResponse);
                                }
                            };
                            spy = jest.fn();

                            mojoActions.register("create", mockedApi.create, "create");
                            _context2.next = 7;
                            return mojoActions.create()(spy);

                        case 7:
                            expect(spy).toHaveBeenCalledWith({
                                type: "MOJO_CREATE_FAILURE",
                                payload: {
                                    errors: "Not found.",
                                    errorCode: "404"
                                }
                            });

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        it("should trigger success callback", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var mojoActions, mockedApi, spy, mockedDispatch;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            mojoActions = (0, _actions.apiActionTypes)("MOJO", "r");
                            mockedApi = {
                                read: function read() {
                                    return Promise.resolve({ data: "data", status: "ok" });
                                }
                            };
                            spy = jest.fn();
                            mockedDispatch = jest.fn();

                            mojoActions.register("read", mockedApi.read, "read", spy);
                            _context3.next = 7;
                            return mojoActions.read("arg")(mockedDispatch);

                        case 7:
                            expect(spy).toHaveBeenCalledWith("data", "arg", mockedDispatch);

                        case 8:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));
    });

    describe("basic actions", function () {
        it("should SET_ITEM", function () {
            var mojoActions = (0, _actions.basicActionTypes)("MOJO");
            expect(mojoActions.setItem("toto")).toEqual({
                type: "MOJO_SET_ITEM",
                payload: "toto"
            });
        });

        it("should CLEAR_ITEM", function () {
            var mojoActions = (0, _actions.basicActionTypes)("MOJO");
            expect(mojoActions.clearItem()).toEqual({
                type: "MOJO_CLEAR_ITEM"
            });
        });
    });
});