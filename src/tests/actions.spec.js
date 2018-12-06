/* eslint-env jest */
/* eslint prefer-promise-reject-errors: 0 */

import { apiActions, assignCrudMethod, getActionName } from "../actions";
import { CREATE, READ, UPDATE, DELETE, LIST, POST } from "../utils";

describe("Redux api actions", () => {
    describe("getActionName", () => {
        it("should match the correct action name", () => {
            expect(getActionName(CREATE)).toEqual("create");
            expect(getActionName(READ)).toEqual("read");
            expect(getActionName(UPDATE)).toEqual("update");
            expect(getActionName(DELETE)).toEqual("delete");
            expect(getActionName(LIST)).toEqual("list");
            expect(getActionName(POST)).toEqual("post");
            expect(() => getActionName(0)).toThrow();
        });
    });

    describe("apiActions errors", () => {
        it("should throw on bad parameters.", () => {
            expect(() => apiActions(null)).toThrow();
            expect(() => apiActions("")).toThrow();
            expect(() => apiActions("  ")).toThrow();
        });
    });

    describe("apiActions basic actions", () => {
        it("should create basic actions", () => {
            const mojoActions = apiActions("MOJO");
            expect(mojoActions.SET_ITEM).toEqual("MOJO_SET_ITEM");
            expect(mojoActions.CLEAR_ITEM).toEqual("MOJO_CLEAR_ITEM");
            expect(mojoActions.CLEAR_ERRORS).toEqual("MOJO_CLEAR_ERRORS");
            expect(mojoActions.setItem("data")).toEqual({
                type: mojoActions.SET_ITEM,
                payload: "data",
            });
            expect(mojoActions.clearItem()).toEqual({
                type: mojoActions.CLEAR_ITEM,
            });
            expect(mojoActions.clearErrors()).toEqual({
                type: mojoActions.CLEAR_ERRORS,
            });
        });
    });

    describe("apiActions crud actions", () => {
        it("should create CREATE resource group", () => {
            const mojoActions = apiActions("MOJO", CREATE);
            expect(mojoActions.CREATE_REQUEST).toEqual("MOJO_CREATE_REQUEST");
            expect(mojoActions.createRequest("data")).toEqual({
                type: mojoActions.CREATE_REQUEST,
                payload: "data",
                error: false,
            });
            expect(mojoActions.CREATE_SUCCESS).toEqual("MOJO_CREATE_SUCCESS");
            expect(mojoActions.createSuccess(200, "success")).toEqual({
                type: mojoActions.CREATE_SUCCESS,
                payload: { data: "success", statusCode: 200 },
                error: false,
            });
            expect(mojoActions.CREATE_FAILURE).toEqual("MOJO_CREATE_FAILURE");
            expect(mojoActions.createFailure(400, "error")).toEqual({
                type: mojoActions.CREATE_FAILURE,
                payload: new Error({ data: "error", statusCode: 400 }),
                error: true,
            });
        });

        it("should NOT create CREATE resource group", () => {
            const mojoActions = apiActions(
                "MOJO",
                READ | UPDATE | DELETE | LIST | POST
            );
            expect(mojoActions.CREATE_REQUEST).toBe(undefined);
            expect(mojoActions.CREATE_SUCCESS).toBe(undefined);
            expect(mojoActions.CREATE_FAILURE).toBe(undefined);
        });

        it("should create READ resource group", () => {
            const mojoActions = apiActions("MOJO", READ);
            expect(mojoActions.READ_REQUEST).toEqual("MOJO_READ_REQUEST");
            expect(mojoActions.readRequest("data")).toEqual({
                type: mojoActions.READ_REQUEST,
                payload: "data",
                error: false,
            });
            expect(mojoActions.READ_SUCCESS).toEqual("MOJO_READ_SUCCESS");
            expect(mojoActions.readSuccess(200, "success")).toEqual({
                type: mojoActions.READ_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200,
                },
                error: false,
            });
            expect(mojoActions.READ_FAILURE).toEqual("MOJO_READ_FAILURE");
            expect(mojoActions.readFailure(400, "error.")).toEqual({
                type: mojoActions.READ_FAILURE,
                payload: new Error({
                    data: "error.",
                    statusCode: 400,
                }),
                error: true,
            });
        });

        it("should NOT create READ resource group", () => {
            const mojoActions = apiActions(
                "MOJO",
                CREATE | UPDATE | DELETE | LIST | POST
            );
            expect(mojoActions.READ_REQUEST).toBe(undefined);
            expect(mojoActions.READ_SUCCESS).toBe(undefined);
            expect(mojoActions.READ_FAILURE).toBe(undefined);
        });

        it("should create UPDATE resource group", () => {
            const mojoActions = apiActions("MOJO", UPDATE);
            expect(mojoActions.UPDATE_REQUEST).toEqual("MOJO_UPDATE_REQUEST");
            expect(mojoActions.updateRequest("data")).toEqual({
                type: mojoActions.UPDATE_REQUEST,
                payload: "data",
                error: false,
            });
            expect(mojoActions.UPDATE_SUCCESS).toEqual("MOJO_UPDATE_SUCCESS");
            expect(mojoActions.updateSuccess(200, "success")).toEqual({
                type: mojoActions.UPDATE_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200,
                },
                error: false,
            });
            expect(mojoActions.UPDATE_FAILURE).toEqual("MOJO_UPDATE_FAILURE");
            expect(mojoActions.updateFailure(400, "Couldn't update.")).toEqual({
                type: mojoActions.UPDATE_FAILURE,
                payload: new Error({
                    data: "Couldn't update.",
                    statusCode: 400,
                }),
                error: true,
            });
        });

        it("should NOT create UPDATE resource group", () => {
            const mojoActions = apiActions(
                "MOJO",
                CREATE | READ | DELETE | LIST | POST
            );
            expect(mojoActions.UPDATE_REQUEST).toBe(undefined);
            expect(mojoActions.UPDATE_SUCCESS).toBe(undefined);
            expect(mojoActions.UPDATE_FAILURE).toBe(undefined);
        });

        it("should create DELETE resource group", () => {
            const mojoActions = apiActions("MOJO", DELETE);
            expect(mojoActions.DELETE_REQUEST).toEqual("MOJO_DELETE_REQUEST");
            expect(mojoActions.deleteRequest("request")).toEqual({
                type: mojoActions.DELETE_REQUEST,
                payload: "request",
                error: false,
            });
            expect(mojoActions.DELETE_SUCCESS).toEqual("MOJO_DELETE_SUCCESS");
            expect(mojoActions.deleteSuccess(204, "success")).toEqual({
                type: mojoActions.DELETE_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 204,
                },
                error: false,
            });
            expect(mojoActions.DELETE_FAILURE).toEqual("MOJO_DELETE_FAILURE");
            expect(mojoActions.deleteFailure(400, "Couldn't delete.")).toEqual({
                type: mojoActions.DELETE_FAILURE,
                payload: new Error({
                    data: "Couldn't delete.",
                    statusCode: 400,
                }),
                error: true,
            });
        });

        it("should NOT create DELETE resource group", () => {
            const mojoActions = apiActions(
                "MOJO",
                CREATE | READ | UPDATE | LIST | POST
            );
            expect(mojoActions.DELETE_REQUEST).toBe(undefined);
            expect(mojoActions.DELETE_SUCCESS).toBe(undefined);
            expect(mojoActions.DELETE_FAILURE).toBe(undefined);
        });

        it("should create LIST resource group", () => {
            const mojoActions = apiActions("MOJO", LIST);
            expect(mojoActions.LIST_REQUEST).toEqual("MOJO_LIST_REQUEST");
            expect(mojoActions.listRequest("request")).toEqual({
                type: mojoActions.LIST_REQUEST,
                payload: "request",
                error: false,
            });
            expect(mojoActions.LIST_SUCCESS).toEqual("MOJO_LIST_SUCCESS");
            expect(mojoActions.listSuccess(200, "success")).toEqual({
                type: mojoActions.LIST_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200,
                },
                error: false,
            });
            expect(mojoActions.LIST_FAILURE).toEqual("MOJO_LIST_FAILURE");
            expect(mojoActions.listFailure(400, "Couldn't list.")).toEqual({
                type: mojoActions.LIST_FAILURE,
                payload: new Error({
                    data: "Couldn't list.",
                    statusCode: 400,
                }),
                error: true,
            });
        });

        it("should NOT create LIST resource group", () => {
            const mojoActions = apiActions(
                "MOJO",
                CREATE | READ | UPDATE | DELETE | POST
            );
            expect(mojoActions.LIST_REQUEST).toBe(undefined);
            expect(mojoActions.LIST_SUCCESS).toBe(undefined);
            expect(mojoActions.LIST_FAILURE).toBe(undefined);
        });

        it("should create POST resource group", () => {
            const mojoActions = apiActions("MOJO", POST);
            expect(mojoActions.POST_REQUEST).toEqual("MOJO_POST_REQUEST");
            expect(mojoActions.postRequest("request")).toEqual({
                type: mojoActions.POST_REQUEST,
                payload: "request",
                error: false,
            });
            expect(mojoActions.POST_SUCCESS).toEqual("MOJO_POST_SUCCESS");
            expect(mojoActions.postSuccess(200, "success")).toEqual({
                type: mojoActions.POST_SUCCESS,
                payload: {
                    data: "success",
                    statusCode: 200,
                },
                error: false,
            });
            expect(mojoActions.POST_FAILURE).toEqual("MOJO_POST_FAILURE");
            expect(mojoActions.postFailure(400, "Couldn't post.")).toEqual({
                type: mojoActions.POST_FAILURE,
                payload: new Error({
                    data: "Couldn't post.",
                    statusCode: 400,
                }),
                error: true,
            });
        });

        it("should NOT create POST resource group", () => {
            const mojoActions = apiActions(
                "MOJO",
                CREATE | READ | UPDATE | DELETE | LIST
            );
            expect(mojoActions.POST_REQUEST).toBe(undefined);
            expect(mojoActions.POST_SUCCESS).toBe(undefined);
            expect(mojoActions.POST_FAILURE).toBe(undefined);
        });
    });

    describe("Action assignCrudMethod", () => {
        it("should dispatch success", async () => {
            const mojoActions = apiActions("MOJO", CREATE);
            const mockedApi = {
                create: () => Promise.resolve({ status: 200, data: "created" }),
            };
            const spy = jest.fn();
            mojoActions.create = assignCrudMethod(
                mojoActions,
                mockedApi.create,
                CREATE
            );
            await mojoActions.create()(spy);
            expect(spy).toHaveBeenCalledWith({
                type: "MOJO_CREATE_SUCCESS",
                payload: { statusCode: 200, data: "created" },
                error: false,
            });
        });

        it("should dispatch error", async () => {
            const mojoActions = apiActions("MOJO", CREATE);
            const mockedApi = {
                create: () =>
                    Promise.reject({
                        response: { status: 404, data: "Not found." },
                    }),
            };
            const spy = jest.fn();
            mojoActions.create = assignCrudMethod(
                mojoActions,
                mockedApi.create,
                CREATE
            );
            await mojoActions.create()(spy);
            expect(spy).toHaveBeenCalledWith({
                type: "MOJO_CREATE_FAILURE",
                payload: new Error({
                    data: "Not found.",
                    statusCode: 404,
                }),
                error: true,
            });
        });
    });
});
