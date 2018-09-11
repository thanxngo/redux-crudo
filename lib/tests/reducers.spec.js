"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env jest */


var _reducers = require("../reducers");

var defaultState = {
    args: {},
    item: {},
    items: new Map(),
    error: false,
    errors: {},
    errorCode: 0,
    loading: true,
    status: "create_request"
};

describe("Redux api reducer", function () {
    describe("Create", function () {
        it("should CREATE_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "c");
            expect(reducer(defaultState, {
                type: "MOJO_CREATE_REQUEST",
                payload: { data: { me: "me" } }
            })).toEqual(_extends({}, defaultState, {
                args: { data: { me: "me" } },
                item: { me: "me" },
                loading: true,
                status: "create_request"
            }));
        });

        it("should CREATE_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "c");
            var initialState = _extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "create_request"
            });
            expect(reducer(initialState, {
                type: "MOJO_CREATE_SUCCESS",
                payload: "created"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                item: "created",
                loading: false,
                status: "create_success"
            }));
        });

        it("should CREATE_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "c");
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_CREATE_FAILURE",
                payload: {
                    errorCode: "oops",
                    errors: "Couldn't create."
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "create_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't create."
            }));
        });
    });

    describe("Read", function () {
        it("should READ_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "r");
            expect(reducer(defaultState, {
                type: "MOJO_READ_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "read_request"
            }));
        });

        it("should READ_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "r");
            expect(reducer(_extends({}, defaultState, {
                error: true,
                errorCode: "1000",
                errors: "oops",
                loading: true,
                item: "toto"
            }), {
                type: "MOJO_READ_SUCCESS",
                payload: "item"
            })).toEqual(_extends({}, defaultState, {
                item: "item",
                loading: false,
                status: "read_success",
                error: false,
                errors: {},
                errorCode: 0
            }));
        });

        it("should READ_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "r");
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_READ_FAILURE",
                payload: {
                    errorCode: "oops",
                    errors: "Couldn't read."
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "read_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't read."
            }));
        });
    });

    describe("Update", function () {
        it("should UPDATE_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "u");
            // Current state
            var item = { id: "1000", name: "toto" };
            var items = new Map();
            items.set(item.id, item);
            // Next state
            var newItem = { id: "1000", name: "tata" };
            var newItems = new Map();
            newItems.set(newItem.id, newItem);
            expect(reducer(_extends({}, defaultState, { item: item, items: items }), {
                type: "MOJO_UPDATE_REQUEST",
                payload: { id: item.id, data: { name: "tata" } }
            })).toEqual(_extends({}, defaultState, {
                loading: true,
                item: newItem,
                items: newItems,
                status: "update_request"
            }));
        });

        it("should UPDATE_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "u");
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {},
                errorCode: "oops"
            }), {
                type: "MOJO_UPDATE_SUCCESS",
                payload: "item"
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                item: "item",
                error: false,
                errorCode: 0,
                status: "update_success"
            }));
        });

        it("should UPDATE_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "u");
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_UPDATE_FAILURE",
                payload: {
                    errorCode: "oops",
                    errors: "Couldn't update."
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "update_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't update."
            }));
        });
    });

    describe("List", function () {
        it("should LIST_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "l");
            expect(reducer(defaultState, {
                type: "MOJO_LIST_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "list_request"
            }));
        });

        it("should LIST_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "l");
            var item1 = { uuid: "1" };
            var item2 = { uuid: "2" };
            var items = new Map();
            items.set(item1.uuid, item1);
            items.set(item2.uuid, item2);
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {},
                errorCode: "oops"
            }), {
                type: "MOJO_LIST_SUCCESS",
                payload: [item2, item1]
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                items: items,
                error: false,
                errorCode: 0,
                status: "list_success"
            }));
        });
        it("should LIST_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "l");
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_LIST_FAILURE",
                payload: {
                    errorCode: "oops",
                    errors: "Couldn't list."
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "list_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't list."
            }));
        });
    });

    describe("Post", function () {
        it("should POST_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "p");
            expect(reducer(defaultState, {
                type: "MOJO_POST_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "post_request"
            }));
        });

        it("should POST_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "p");
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {},
                errorCode: "oops"
            }), {
                type: "MOJO_POST_SUCCESS",
                payload: "item"
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                item: "item",
                error: false,
                errorCode: 0,
                status: "post_success"
            }));
        });

        it("should POST_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "p");
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_POST_FAILURE",
                payload: {
                    errorCode: "oops",
                    errors: "Couldn't list."
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "post_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't list."
            }));
        });
    });

    describe("Delete", function () {
        it("should DELETE_REQUEST", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "d");
            expect(reducer(defaultState, {
                type: "MOJO_DELETE_REQUEST",
                payload: "me"
            })).toEqual(_extends({}, defaultState, {
                args: "me",
                loading: true,
                status: "delete_request"
            }));
        });

        it("should DELETE_SUCCESS", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "d");
            expect(reducer(_extends({}, defaultState, {
                loading: true,
                error: true,
                errors: {},
                errorCode: "oops"
            }), {
                type: "MOJO_DELETE_SUCCESS"
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                error: false,
                errorCode: 0,
                status: "delete_success"
            }));
        });

        it("should DELETE_ERROR", function () {
            var reducer = (0, _reducers.apiReducer)("MOJO", "d");
            expect(reducer(_extends({}, defaultState, {
                loading: true
            }), {
                type: "MOJO_DELETE_FAILURE",
                payload: {
                    errorCode: "oops",
                    errors: "Couldn't list."
                }
            })).toEqual(_extends({}, defaultState, {
                loading: false,
                status: "delete_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't list."
            }));
        });

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
    });
});