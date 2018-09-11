/* eslint-env jest */
import { apiReducer } from "../reducers";

const defaultState = {
    args: {},
    item: {},
    items: new Map(),
    error: false,
    errors: {},
    errorCode: 0,
    loading: true,
    status: "create_request",
};

describe("Redux api reducer", () => {
    describe("Create", () => {
        it("should CREATE_REQUEST", () => {
            const reducer = apiReducer("MOJO", "c");
            expect(
                reducer(defaultState, {
                    type: "MOJO_CREATE_REQUEST",
                    payload: { data: { me: "me" } },
                })
            ).toEqual({
                ...defaultState,
                args: { data: { me: "me" } },
                item: { me: "me" },
                loading: true,
                status: "create_request",
            });
        });

        it("should CREATE_SUCCESS", () => {
            const reducer = apiReducer("MOJO", "c");
            const initialState = {
                ...defaultState,
                args: "me",
                loading: true,
                status: "create_request",
            };
            expect(
                reducer(initialState, {
                    type: "MOJO_CREATE_SUCCESS",
                    payload: "created",
                })
            ).toEqual({
                ...defaultState,
                args: "me",
                item: "created",
                loading: false,
                status: "create_success",
            });
        });

        it("should CREATE_ERROR", () => {
            const reducer = apiReducer("MOJO", "c");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_CREATE_FAILURE",
                        payload: {
                            errorCode: "oops",
                            errors: "Couldn't create.",
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "create_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't create.",
            });
        });
    });

    describe("Read", () => {
        it("should READ_REQUEST", () => {
            const reducer = apiReducer("MOJO", "r");
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

        it("should READ_SUCCESS", () => {
            const reducer = apiReducer("MOJO", "r");
            expect(
                reducer(
                    {
                        ...defaultState,
                        error: true,
                        errorCode: "1000",
                        errors: "oops",
                        loading: true,
                        item: "toto",
                    },
                    {
                        type: "MOJO_READ_SUCCESS",
                        payload: "item",
                    }
                )
            ).toEqual({
                ...defaultState,
                item: "item",
                loading: false,
                status: "read_success",
                error: false,
                errors: {},
                errorCode: 0,
            });
        });

        it("should READ_ERROR", () => {
            const reducer = apiReducer("MOJO", "r");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_READ_FAILURE",
                        payload: {
                            errorCode: "oops",
                            errors: "Couldn't read.",
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "read_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't read.",
            });
        });
    });

    describe("Update", () => {
        it("should UPDATE_REQUEST", () => {
            const reducer = apiReducer("MOJO", "u");
            // Current state
            const item = { id: "1000", name: "toto" };
            const items = new Map();
            items.set(item.id, item);
            // Next state
            const newItem = { id: "1000", name: "tata" };
            const newItems = new Map();
            newItems.set(newItem.id, newItem);
            expect(
                reducer(
                    { ...defaultState, item, items },
                    {
                        type: "MOJO_UPDATE_REQUEST",
                        payload: { id: item.id, data: { name: "tata" } },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: true,
                item: newItem,
                items: newItems,
                status: "update_request",
            });
        });

        it("should UPDATE_SUCCESS", () => {
            const reducer = apiReducer("MOJO", "u");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        error: true,
                        errors: {},
                        errorCode: "oops",
                    },
                    {
                        type: "MOJO_UPDATE_SUCCESS",
                        payload: "item",
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                item: "item",
                error: false,
                errorCode: 0,
                status: "update_success",
            });
        });

        it("should UPDATE_ERROR", () => {
            const reducer = apiReducer("MOJO", "u");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_UPDATE_FAILURE",
                        payload: {
                            errorCode: "oops",
                            errors: "Couldn't update.",
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "update_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't update.",
            });
        });
    });

    describe("List", () => {
        it("should LIST_REQUEST", () => {
            const reducer = apiReducer("MOJO", "l");
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

        it("should LIST_SUCCESS", () => {
            const reducer = apiReducer("MOJO", "l");
            const item1 = { uuid: "1" };
            const item2 = { uuid: "2" };
            const items = new Map();
            items.set(item1.uuid, item1);
            items.set(item2.uuid, item2);
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        error: true,
                        errors: {},
                        errorCode: "oops",
                    },
                    {
                        type: "MOJO_LIST_SUCCESS",
                        payload: [item2, item1],
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                items,
                error: false,
                errorCode: 0,
                status: "list_success",
            });
        });
        it("should LIST_ERROR", () => {
            const reducer = apiReducer("MOJO", "l");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_LIST_FAILURE",
                        payload: {
                            errorCode: "oops",
                            errors: "Couldn't list.",
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "list_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't list.",
            });
        });
    });

    describe("Post", () => {
        it("should POST_REQUEST", () => {
            const reducer = apiReducer("MOJO", "p");
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

        it("should POST_SUCCESS", () => {
            const reducer = apiReducer("MOJO", "p");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        error: true,
                        errors: {},
                        errorCode: "oops",
                    },
                    {
                        type: "MOJO_POST_SUCCESS",
                        payload: "item",
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                item: "item",
                error: false,
                errorCode: 0,
                status: "post_success",
            });
        });

        it("should POST_ERROR", () => {
            const reducer = apiReducer("MOJO", "p");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_POST_FAILURE",
                        payload: {
                            errorCode: "oops",
                            errors: "Couldn't list.",
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "post_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't list.",
            });
        });
    });

    describe("Delete", () => {
        it("should DELETE_REQUEST", () => {
            const reducer = apiReducer("MOJO", "d");
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

        it("should DELETE_SUCCESS", () => {
            const reducer = apiReducer("MOJO", "d");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                        error: true,
                        errors: {},
                        errorCode: "oops",
                    },
                    {
                        type: "MOJO_DELETE_SUCCESS",
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                error: false,
                errorCode: 0,
                status: "delete_success",
            });
        });

        it("should DELETE_ERROR", () => {
            const reducer = apiReducer("MOJO", "d");
            expect(
                reducer(
                    {
                        ...defaultState,
                        loading: true,
                    },
                    {
                        type: "MOJO_DELETE_FAILURE",
                        payload: {
                            errorCode: "oops",
                            errors: "Couldn't list.",
                        },
                    }
                )
            ).toEqual({
                ...defaultState,
                loading: false,
                status: "delete_failure",
                error: true,
                errorCode: "oops",
                errors: "Couldn't list.",
            });
        });

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
    });
});
