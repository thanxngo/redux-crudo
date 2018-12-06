/* eslint-env jest */
import { Map } from "immutable";
import { apiReducer } from "../reducers";

import { CREATE, READ, UPDATE, DELETE, LIST, POST } from "../utils";

const defaultState = {
    args: {},
    item: {},
    items: new Map(),
    errors: {},
    loading: true,
    status: "create_request",
    statusCode: 0,
};

describe("Redux api reducer", () => {
    describe("Basic reducer.", () => {
        it("should return a basic reducer.", () => {
            const reducer = apiReducer("MOJO");
            expect(reducer(undefined, { type: "SOMETHING" })).toEqual({
                args: {},
                item: {},
                items: new Map(),
                errors: {},
                loading: false,
                status: "",
                statusCode: 0,
            });
        });
    });

    describe("Create", () => {
        it("should CREATE_REQUEST", () => {
            const reducer = apiReducer("MOJO", CREATE);
            expect(
                reducer(defaultState, {
                    type: "MOJO_CREATE_REQUEST",
                    payload: { data: { me: "me" } },
                })
            ).toEqual({
                ...defaultState,
                args: { data: { me: "me" } },
                loading: true,
                status: "create_request",
            });
        });

        it("should CREATE_REQUEST (no payload)", () => {
            const reducer = apiReducer("MOJO", CREATE);
            expect(
                reducer(defaultState, {
                    type: "MOJO_CREATE_REQUEST",
                    payload: null,
                })
            ).toEqual({
                ...defaultState,
                args: {},
                loading: true,
                status: "create_request",
            });
        });

        it("should CREATE_SUCCESS", () => {
            const reducer = apiReducer("MOJO", CREATE);
            const initialState = {
                ...defaultState,
                args: "me",
                loading: true,
                status: "create_request",
            };
            expect(
                reducer(initialState, {
                    type: "MOJO_CREATE_SUCCESS",
                    payload: {
                        statusCode: 200,
                        data: "created",
                    },
                })
            ).toEqual({
                ...defaultState,
                args: "me",
                item: "created",
                loading: false,
                status: "create_success",
                statusCode: 200,
            });
        });

        it("should CREATE_ERROR", () => {
            const reducer = apiReducer("MOJO", CREATE);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_CREATE_FAILURE",
                        payload: {
                            data: "Couldn't create.",
                            statusCode: 400,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "create_failure",
                errors: "Couldn't create.",
                statusCode: 400,
            });
        });
    });

    describe("Read", () => {
        it("should READ_REQUEST", () => {
            const reducer = apiReducer("MOJO", READ);
            expect(
                reducer(defaultState, {
                    type: "MOJO_READ_REQUEST",
                    payload: "me",
                })
            ).toEqual({
                ...defaultState,
                args: "me",
                loading: true,
                status: "read_request",
            });
        });

        it("should READ_REQUEST no payload", () => {
            const reducer = apiReducer("MOJO", READ);
            expect(
                reducer(defaultState, {
                    type: "MOJO_READ_REQUEST",
                    payload: null,
                })
            ).toEqual({
                ...defaultState,
                args: {},
                loading: true,
                status: "read_request",
            });
        });

        it("should READ_SUCCESS", () => {
            const reducer = apiReducer("MOJO", READ);
            expect(
                reducer(
                    {
                        ...defaultState,
                        errors: "oops",
                        loading: true,
                        item: "toto",
                    },
                    {
                        type: "MOJO_READ_SUCCESS",
                        payload: {
                            data: "item",
                            statusCode: 200,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                item: "item",
                loading: false,
                status: "read_success",
                errors: {},
                statusCode: 200,
            });
        });

        it("should READ_ERROR", () => {
            const reducer = apiReducer("MOJO", READ);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_READ_FAILURE",
                        payload: {
                            data: "Couldn't read.",
                            statusCode: 400,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "read_failure",
                errors: "Couldn't read.",
                statusCode: 400,
            });
        });
    });

    describe("Update", () => {
        it("should UPDATE_REQUEST", () => {
            const reducer = apiReducer("MOJO", UPDATE);
            // Current state
            const item = { id: "1000", name: "toto" };
            const items = new Map();
            items.set(item.id, item);
            // Next state
            const newItem = { id: "1000", name: "tata" };
            const newItems = new Map();
            newItems.set(newItem.id, newItem);
            expect(
                reducer(defaultState, {
                    type: "MOJO_UPDATE_REQUEST",
                    payload: { id: item.id, data: { name: "tata" } },
                })
            ).toEqual({
                ...defaultState,
                args: { id: item.id, data: { name: "tata" } },
                loading: true,
                status: "update_request",
            });
        });

        it("should UPDATE_REQUEST", () => {
            const reducer = apiReducer("MOJO", UPDATE);
            expect(
                reducer(defaultState, {
                    type: "MOJO_UPDATE_REQUEST",
                    payload: null,
                })
            ).toEqual({
                ...defaultState,
                args: {},
                loading: true,
                status: "update_request",
            });
        });

        it("should UPDATE_SUCCESS", () => {
            const reducer = apiReducer("MOJO", UPDATE);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        errors: {},
                    },
                    {
                        type: "MOJO_UPDATE_SUCCESS",
                        payload: {
                            data: "item",
                            statusCode: 200,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                item: "item",
                status: "update_success",
                statusCode: 200,
            });
        });

        it("should UPDATE_ERROR", () => {
            const reducer = apiReducer("MOJO", UPDATE);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_UPDATE_FAILURE",
                        payload: {
                            data: "Couldn't update.",
                            statusCode: 400,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "update_failure",
                errors: "Couldn't update.",
                statusCode: 400,
            });
        });
    });

    describe("Delete", () => {
        it("should DELETE_REQUEST", () => {
            const reducer = apiReducer("MOJO", DELETE);
            expect(
                reducer(defaultState, {
                    type: "MOJO_DELETE_REQUEST",
                    payload: "me",
                })
            ).toEqual({
                ...defaultState,
                args: "me",
                loading: true,
                status: "delete_request",
            });
        });

        it("should DELETE_REQUEST no payload", () => {
            const reducer = apiReducer("MOJO", DELETE);
            expect(
                reducer(defaultState, {
                    type: "MOJO_DELETE_REQUEST",
                    payload: null,
                })
            ).toEqual({
                ...defaultState,
                args: {},
                loading: true,
                status: "delete_request",
            });
        });

        it("should DELETE_SUCCESS", () => {
            const reducer = apiReducer("MOJO", DELETE);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        errors: {},
                    },
                    {
                        type: "MOJO_DELETE_SUCCESS",
                        payload: {
                            data: null,
                            statusCode: 204,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "delete_success",
                statusCode: 204,
            });
        });

        it("should DELETE_ERROR", () => {
            const reducer = apiReducer("MOJO", DELETE);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_DELETE_FAILURE",
                        payload: {
                            data: "Couldn't delete.",
                            statusCode: 400,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "delete_failure",
                errors: "Couldn't delete.",
                statusCode: 400,
            });
        });
    });

    describe("List", () => {
        it("should LIST_REQUEST", () => {
            const reducer = apiReducer("MOJO", LIST);
            expect(
                reducer(defaultState, {
                    type: "MOJO_LIST_REQUEST",
                    payload: "me",
                })
            ).toEqual({
                ...defaultState,
                args: "me",
                loading: true,
                status: "list_request",
            });
        });

        it("should LIST_REQUEST no payload", () => {
            const reducer = apiReducer("MOJO", LIST);
            expect(
                reducer(defaultState, {
                    type: "MOJO_LIST_REQUEST",
                    payload: null,
                })
            ).toEqual({
                ...defaultState,
                args: {},
                loading: true,
                status: "list_request",
            });
        });

        it("should LIST_SUCCESS", () => {
            const reducer = apiReducer("MOJO", LIST);
            const item1 = { uuid: "1" };
            const item2 = { uuid: "2" };
            let items = new Map();
            items = items.set(item1.uuid, item1);
            items = items.set(item2.uuid, item2);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        errors: {},
                    },
                    {
                        type: "MOJO_LIST_SUCCESS",
                        payload: {
                            data: [item2, item1],
                            statusCode: 200,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                items,
                status: "list_success",
                statusCode: 200,
            });
        });

        it("should LIST_SUCCESS sort items", () => {
            const sortingFunction = list =>
                Map(list.map(item => [item.id, item]));

            const reducer = apiReducer("MOJO", LIST, {
                sortItems: sortingFunction,
            });
            const item1 = { id: "1" };
            const item2 = { id: "2" };
            let items = new Map();
            items = items.set(item1.id, item1);
            items = items.set(item2.id, item2);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        errors: {},
                    },
                    {
                        type: "MOJO_LIST_SUCCESS",
                        payload: {
                            data: [item2, item1],
                            statusCode: 200,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                items,
                status: "list_success",
                statusCode: 200,
            });
        });

        it("should LIST_ERROR", () => {
            const reducer = apiReducer("MOJO", LIST);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_LIST_FAILURE",
                        payload: {
                            data: "Couldn't list.",
                            statusCode: 400,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "list_failure",
                errors: "Couldn't list.",
                statusCode: 400,
            });
        });
    });

    describe("Post", () => {
        it("should POST_REQUEST", () => {
            const reducer = apiReducer("MOJO", POST);
            expect(
                reducer(defaultState, {
                    type: "MOJO_POST_REQUEST",
                    payload: "me",
                })
            ).toEqual({
                ...defaultState,
                args: "me",
                loading: true,
                status: "post_request",
            });
        });

        it("should POST_REQUEST no payload", () => {
            const reducer = apiReducer("MOJO", POST);
            expect(
                reducer(defaultState, {
                    type: "MOJO_POST_REQUEST",
                    payload: null,
                })
            ).toEqual({
                ...defaultState,
                args: {},
                loading: true,
                status: "post_request",
            });
        });

        it("should POST_SUCCESS", () => {
            const reducer = apiReducer("MOJO", POST);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        errors: {},
                    },
                    {
                        type: "MOJO_POST_SUCCESS",
                        payload: {
                            data: "item",
                            statusCode: 200,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                item: "item",
                status: "post_success",
                statusCode: 200,
            });
        });

        it("should POST_SUCCESS no data", () => {
            const reducer = apiReducer("MOJO", POST);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        errors: {},
                    },
                    {
                        type: "MOJO_POST_SUCCESS",
                        payload: {
                            statusCode: 200,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                item: {},
                status: "post_success",
                statusCode: 200,
            });
        });

        it("should POST_ERROR", () => {
            const reducer = apiReducer("MOJO", POST);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_POST_FAILURE",
                        payload: {
                            data: "Couldn't post.",
                            statusCode: 400,
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "post_failure",
                errors: "Couldn't post.",
                statusCode: 400,
            });
        });
    });

    describe("Basic actions", () => {
        it("should SET_ITEM", () => {
            const reducer = apiReducer("MOJO");
            expect(
                reducer(
                    { ...defaultState, item: {} },
                    { type: "MOJO_SET_ITEM", payload: { id: "1000" } }
                )
            ).toEqual({
                ...defaultState,
                item: {
                    id: "1000",
                },
            });
        });

        it("should CLEAR_ITEM", () => {
            const reducer = apiReducer("MOJO");
            expect(
                reducer(
                    { ...defaultState, item: { id: "1000" } },
                    { type: "MOJO_CLEAR_ITEM" }
                )
            ).toEqual({
                ...defaultState,
                item: {},
            });
        });

        it("should CLEAR_ERRORS", () => {
            const reducer = apiReducer("MOJO");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        errors: "errors",
                    },
                    { type: "MOJO_CLEAR_ERRORS" }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
            });
        });
    });
});
