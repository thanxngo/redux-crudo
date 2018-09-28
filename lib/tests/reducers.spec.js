"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env jest */


var _immutable = require("immutable");

var _reducers = require("../reducers");

var _utils = require("../utils");

var defaultState = {
    args: {},
    item: {},
    items: new _immutable.Map(),
    error: false,
    errors: {},
    loading: true,
    status: "create_request",
    statusCode: 0
};

describe("Redux api reducer", function () {
    describe("Basic reducer.", function () {
        it("should return a basic reducer.", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO");
            expect(reducer(undefined, { type: "SOMETHING" })).toEqual({
                args: {},
                item: {},
                items: new _immutable.Map(),
                error: false,
                errors: {},
                loading: false,
                status: "",
                statusCode: 0
            });
        });
    });

    describe("Create", function () {
        it("should CREATE_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.CREATE);
            expect(reducer(defaultState, {
                type: "MOJO_CREATE_REQUEST",
                payload: { data: { me: "me" } }
            })).toEqual(_extends({}, defaultState, {
                args: { data: { me: "me" } },
                loading: true,
                status: "create_request"
            }));
        });

        it("should CREATE_REQUEST (no payload)", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.CREATE);
            expect(reducer(defaultState, {
                type: "MOJO_CREATE_REQUEST",
                payload: null
            })).toEqual(_extends({}, defaultState, {
                args: {},
                loading: true,
                status: "create_request"
            }));
        });

        it("should CREATE_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.CREATE);
            var initialState = _extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "create_request"
            });
            expect(reducer(initialState, {
                type: "MOJO_CREATE_SUCCESS",
                payload: {
                    statusCode: 200,
                    data: "created"
                }
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                item: "created",
                loading: false,
                status: "create_success",
                statusCode: 200
            }));
        });

        it("should CREATE_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.CREATE);
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_CREATE_FAILURE",
                payload: {
                    data: "Couldn't create.",
                    statusCode: 400
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "create_failure",
                error: true,
                errors: "Couldn't create.",
                statusCode: 400
            }));
        });
    });

    describe("Read", function () {
        it("should READ_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.READ);
            expect(reducer(defaultState, {
                type: "MOJO_READ_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "read_request"
            }));
        });

        it("should READ_REQUEST no payload", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.READ);
            expect(reducer(defaultState, {
                type: "MOJO_READ_REQUEST",
                payload: null
            })).toEqual(_extends({}, defaultState, {
                args: {},
                loading: true,
                status: "read_request"
            }));
        });

        it("should READ_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.READ);
            expect(reducer(_extends({}, defaultState, {
                error: true,
                errors: "oops",
                loading: true,
                item: "toto"
            }), {
                type: "MOJO_READ_SUCCESS",
                payload: {
                    data: "item",
                    statusCode: 200
                }
            })).toEqual(_extends({}, defaultState, {
                item: "item",
                loading: false,
                status: "read_success",
                error: false,
                errors: {},
                statusCode: 200
            }));
        });

        it("should READ_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.READ);
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_READ_FAILURE",
                payload: {
                    data: "Couldn't read.",
                    statusCode: 400
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "read_failure",
                error: true,
                errors: "Couldn't read.",
                statusCode: 400
            }));
        });
    });

    describe("Update", function () {
        it("should UPDATE_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.UPDATE);
            // Current state
            var item = { id: "1000", name: "toto" };
            var items = new _immutable.Map();
            items.set(item.id, item);
            // Next state
            var newItem = { id: "1000", name: "tata" };
            var newItems = new _immutable.Map();
            newItems.set(newItem.id, newItem);
            expect(reducer(defaultState, {
                type: "MOJO_UPDATE_REQUEST",
                payload: { id: item.id, data: { name: "tata" } }
            })).toEqual(_extends({}, defaultState, {
                args: { id: item.id, data: { name: "tata" } },
                loading: true,
                status: "update_request"
            }));
        });

        it("should UPDATE_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.UPDATE);
            expect(reducer(defaultState, {
                type: "MOJO_UPDATE_REQUEST",
                payload: null
            })).toEqual(_extends({}, defaultState, {
                args: {},
                loading: true,
                status: "update_request"
            }));
        });

        it("should UPDATE_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.UPDATE);
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {}
            }), {
                type: "MOJO_UPDATE_SUCCESS",
                payload: {
                    data: "item",
                    statusCode: 200
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                item: "item",
                error: false,
                status: "update_success",
                statusCode: 200
            }));
        });

        it("should UPDATE_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.UPDATE);
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_UPDATE_FAILURE",
                payload: {
                    data: "Couldn't update.",
                    statusCode: 400
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "update_failure",
                error: true,
                errors: "Couldn't update.",
                statusCode: 400
            }));
        });
    });

    describe("Delete", function () {
        it("should DELETE_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.DELETE);
            expect(reducer(defaultState, {
                type: "MOJO_DELETE_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "delete_request"
            }));
        });

        it("should DELETE_REQUEST no payload", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.DELETE);
            expect(reducer(defaultState, {
                type: "MOJO_DELETE_REQUEST",
                payload: null
            })).toEqual(_extends({}, defaultState, {
                args: {},
                loading: true,
                status: "delete_request"
            }));
        });

        it("should DELETE_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.DELETE);
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {}
            }), {
                type: "MOJO_DELETE_SUCCESS",
                payload: {
                    data: null,
                    statusCode: 204
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                error: false,
                status: "delete_success",
                statusCode: 204
            }));
        });

        it("should DELETE_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.DELETE);
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_DELETE_FAILURE",
                payload: {
                    data: "Couldn't delete.",
                    statusCode: 400
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "delete_failure",
                error: true,
                errors: "Couldn't delete.",
                statusCode: 400
            }));
        });
    });

    describe("List", function () {
        it("should LIST_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.LIST);
            expect(reducer(defaultState, {
                type: "MOJO_LIST_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "list_request"
            }));
        });

        it("should LIST_REQUEST no payload", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.LIST);
            expect(reducer(defaultState, {
                type: "MOJO_LIST_REQUEST",
                payload: null
            })).toEqual(_extends({}, defaultState, {
                args: {},
                loading: true,
                status: "list_request"
            }));
        });

        it("should LIST_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.LIST);
            var item1 = { uuid: "1" };
            var item2 = { uuid: "2" };
            var items = new _immutable.Map();
            items = items.set(item1.uuid, item1);
            items = items.set(item2.uuid, item2);
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {}
            }), {
                type: "MOJO_LIST_SUCCESS",
                payload: {
                    data: [item2, item1],
                    statusCode: 200
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                items: items,
                error: false,
                status: "list_success",
                statusCode: 200
            }));
        });

        it("should LIST_SUCCESS sort items", function () {
            var sortingFunction = function sortingFunction(list) {
                return (0, _immutable.Map)(list.map(function (item) {
                    return [item.id, item];
                }));
            };

            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.LIST, {
                sortItems: sortingFunction
            });
            var item1 = { id: "1" };
            var item2 = { id: "2" };
            var items = new _immutable.Map();
            items = items.set(item1.id, item1);
            items = items.set(item2.id, item2);
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {}
            }), {
                type: "MOJO_LIST_SUCCESS",
                payload: {
                    data: [item2, item1],
                    statusCode: 200
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                items: items,
                error: false,
                status: "list_success",
                statusCode: 200
            }));
        });

        it("should LIST_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.LIST);
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_LIST_FAILURE",
                payload: {
                    data: "Couldn't list.",
                    statusCode: 400
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "list_failure",
                error: true,
                errors: "Couldn't list.",
                statusCode: 400
            }));
        });
    });

    describe("Post", function () {
        it("should POST_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.POST);
            expect(reducer(defaultState, {
                type: "MOJO_POST_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "post_request"
            }));
        });

        it("should POST_REQUEST no payload", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.POST);
            expect(reducer(defaultState, {
                type: "MOJO_POST_REQUEST",
                payload: null
            })).toEqual(_extends({}, defaultState, {
                args: {},
                loading: true,
                status: "post_request"
            }));
        });

        it("should POST_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.POST);
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {}
            }), {
                type: "MOJO_POST_SUCCESS",
                payload: {
                    data: "item",
                    statusCode: 200
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                item: "item",
                error: false,
                status: "post_success",
                statusCode: 200
            }));
        });

        it("should POST_SUCCESS no data", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.POST);
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {}
            }), {
                type: "MOJO_POST_SUCCESS",
                payload: {
                    statusCode: 200
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                item: {},
                error: false,
                status: "post_success",
                statusCode: 200
            }));
        });

        it("should POST_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", _utils.POST);
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_POST_FAILURE",
                payload: {
                    data: "Couldn't post.",
                    statusCode: 400
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "post_failure",
                error: true,
                errors: "Couldn't post.",
                statusCode: 400
            }));
        });
    });

    describe("Basic actions", function () {
        it("should SET_ITEM", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO");
            expect(reducer(_extends({}, defaultState, { item: {} }), { type: "MOJO_SET_ITEM", payload: { id: "1000" } })).toEqual(_extends({}, defaultState, {
                item: {
                    id: "1000"
                }
            }));
        });

        it("should CLEAR_ITEM", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO");
            expect(reducer(_extends({}, defaultState, { item: { id: "1000" } }), { type: "MOJO_CLEAR_ITEM" })).toEqual(_extends({}, defaultState, {
                item: {}
            }));
        });

        it("should CLEAR_ERRORS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO");
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: "errors"
            }), { type: "MOJO_CLEAR_ERRORS" })).toEqual(_extends({}, defaultState, {
                loading: false
            }));
        });
    });
});