/* eslint-env jest */
import { apiActionTypes, basicActionTypes } from "../actions";

describe("Redux api actions", () => {
    describe("getGroup", () => {
        it("should create CREATE resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "c");
            expect(mojoActions.CREATE_REQUEST).toEqual("MOJO_CREATE_REQUEST");
            expect(mojoActions.createRequest("request")).toEqual({
                type: mojoActions.CREATE_REQUEST,
                payload: "request",
            });
            expect(mojoActions.CREATE_SUCCESS).toEqual("MOJO_CREATE_SUCCESS");
            expect(mojoActions.createSuccess("success")).toEqual({
                type: mojoActions.CREATE_SUCCESS,
                payload: "success",
            });
            expect(mojoActions.CREATE_FAILURE).toEqual("MOJO_CREATE_FAILURE");
            expect(mojoActions.createFailure("failure", "oops")).toEqual({
                type: mojoActions.CREATE_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "oops",
                },
            });
        });

        it("should NOT create CREATE resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "rudlp");
            expect(mojoActions.CREATE_REQUEST).toBe(undefined);
            expect(mojoActions.CREATE_SUCCESS).toBe(undefined);
            expect(mojoActions.CREATE_FAILURE).toBe(undefined);
        });

        it("should create READ resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "r");
            expect(mojoActions.READ_REQUEST).toEqual("MOJO_READ_REQUEST");
            expect(mojoActions.readRequest("request")).toEqual({
                type: mojoActions.READ_REQUEST,
                payload: "request",
            });
            expect(mojoActions.READ_SUCCESS).toEqual("MOJO_READ_SUCCESS");
            expect(mojoActions.readSuccess("success")).toEqual({
                type: mojoActions.READ_SUCCESS,
                payload: "success",
            });
            expect(mojoActions.READ_FAILURE).toEqual("MOJO_READ_FAILURE");
            expect(
                mojoActions.readFailure("failure", "Couldn't read.")
            ).toEqual({
                type: mojoActions.READ_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't read.",
                },
            });
        });

        it("should NOT create READ resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "cudlp");
            expect(mojoActions.READ_REQUEST).toBe(undefined);
            expect(mojoActions.READ_SUCCESS).toBe(undefined);
            expect(mojoActions.READ_FAILURE).toBe(undefined);
        });

        it("should create UPDATE resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "u");
            expect(mojoActions.UPDATE_REQUEST).toEqual("MOJO_UPDATE_REQUEST");
            expect(mojoActions.updateRequest("request")).toEqual({
                type: mojoActions.UPDATE_REQUEST,
                payload: "request",
            });
            expect(mojoActions.UPDATE_SUCCESS).toEqual("MOJO_UPDATE_SUCCESS");
            expect(mojoActions.updateSuccess("success")).toEqual({
                type: mojoActions.UPDATE_SUCCESS,
                payload: "success",
            });
            expect(mojoActions.UPDATE_FAILURE).toEqual("MOJO_UPDATE_FAILURE");
            expect(
                mojoActions.updateFailure("failure", "Couldn't update.")
            ).toEqual({
                type: mojoActions.UPDATE_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't update.",
                },
            });
        });

        it("should NOT create UPDATE resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "crdlp");
            expect(mojoActions.UPDATE_REQUEST).toBe(undefined);
            expect(mojoActions.UPDATE_SUCCESS).toBe(undefined);
            expect(mojoActions.UPDATE_FAILURE).toBe(undefined);
        });

        it("should create DELETE resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "d");
            expect(mojoActions.DELETE_REQUEST).toEqual("MOJO_DELETE_REQUEST");
            expect(mojoActions.deleteRequest("request")).toEqual({
                type: mojoActions.DELETE_REQUEST,
                payload: "request",
            });
            expect(mojoActions.DELETE_SUCCESS).toEqual("MOJO_DELETE_SUCCESS");
            expect(mojoActions.deleteSuccess("success")).toEqual({
                type: mojoActions.DELETE_SUCCESS,
                payload: "success",
            });
            expect(mojoActions.DELETE_FAILURE).toEqual("MOJO_DELETE_FAILURE");
            expect(
                mojoActions.deleteFailure("failure", "Couldn't delete.")
            ).toEqual({
                type: mojoActions.DELETE_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't delete.",
                },
            });
        });

        it("should NOT create DELETE resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "crulp");
            expect(mojoActions.DELETE_REQUEST).toBe(undefined);
            expect(mojoActions.DELETE_SUCCESS).toBe(undefined);
            expect(mojoActions.DELETE_FAILURE).toBe(undefined);
        });

        it("should create LIST resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "l");
            expect(mojoActions.LIST_REQUEST).toEqual("MOJO_LIST_REQUEST");
            expect(mojoActions.listRequest("request")).toEqual({
                type: mojoActions.LIST_REQUEST,
                payload: "request",
            });
            expect(mojoActions.LIST_SUCCESS).toEqual("MOJO_LIST_SUCCESS");
            expect(mojoActions.listSuccess("success")).toEqual({
                type: mojoActions.LIST_SUCCESS,
                payload: "success",
            });
            expect(mojoActions.LIST_FAILURE).toEqual("MOJO_LIST_FAILURE");
            expect(
                mojoActions.listFailure("failure", "Couldn't list.")
            ).toEqual({
                type: mojoActions.LIST_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't list.",
                },
            });
        });

        it("should NOT create LIST resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "crudp");
            expect(mojoActions.LIST_REQUEST).toBe(undefined);
            expect(mojoActions.LIST_SUCCESS).toBe(undefined);
            expect(mojoActions.LIST_FAILURE).toBe(undefined);
        });

        it("should create POST resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "p");
            expect(mojoActions.POST_REQUEST).toEqual("MOJO_POST_REQUEST");
            expect(mojoActions.postRequest("request")).toEqual({
                type: mojoActions.POST_REQUEST,
                payload: "request",
            });
            expect(mojoActions.POST_SUCCESS).toEqual("MOJO_POST_SUCCESS");
            expect(mojoActions.postSuccess("success")).toEqual({
                type: mojoActions.POST_SUCCESS,
                payload: "success",
            });
            expect(mojoActions.POST_FAILURE).toEqual("MOJO_POST_FAILURE");
            expect(
                mojoActions.postFailure("failure", "Couldn't post.")
            ).toEqual({
                type: mojoActions.POST_FAILURE,
                payload: {
                    errorCode: "failure",
                    errors: "Couldn't post.",
                },
            });
        });

        it("should NOT create POST resource group", () => {
            const mojoActions = apiActionTypes("MOJO", "crudl");
            expect(mojoActions.POST_REQUEST).toBe(undefined);
            expect(mojoActions.POST_SUCCESS).toBe(undefined);
            expect(mojoActions.POST_FAILURE).toBe(undefined);
        });
    });

    describe("Action types register", () => {
        it("should dispatch success", async () => {
            const mojoActions = apiActionTypes("MOJO", "c");
            const mockedApi = {
                create: () =>
                    Promise.resolve({ status: "ok", data: "created" }),
            };
            const spy = jest.fn();
            mojoActions.register("create", mockedApi.create, "create");
            await mojoActions.create()(spy);
            expect(spy).toHaveBeenCalledWith({
                type: "MOJO_CREATE_SUCCESS",
                payload: "created",
            });
        });

        it("should dispatch error", async () => {
            const mojoActions = apiActionTypes("MOJO", "c");
            const errorResponse = { statusCode: "404", error: "Not found." };
            const mockedApi = {
                create: () => Promise.resolve(errorResponse),
            };
            const spy = jest.fn();
            mojoActions.register("create", mockedApi.create, "create");
            await mojoActions.create()(spy);
            expect(spy).toHaveBeenCalledWith({
                type: "MOJO_CREATE_FAILURE",
                payload: {
                    errors: "Not found.",
                    errorCode: "404",
                },
            });
        });

        it("should trigger success callback", async () => {
            const mojoActions = apiActionTypes("MOJO", "r");
            const mockedApi = {
                read: () => Promise.resolve({ data: "data", status: "ok" }),
            };
            const spy = jest.fn();
            const mockedDispatch = jest.fn();
            mojoActions.register("read", mockedApi.read, "read", spy);
            await mojoActions.read("arg")(mockedDispatch);
            expect(spy).toHaveBeenCalledWith("data", "arg", mockedDispatch);
        });
    });

    describe("basic actions", () => {
        it("should SET_ITEM", () => {
            const mojoActions = basicActionTypes("MOJO");
            expect(mojoActions.setItem("toto")).toEqual({
                type: "MOJO_SET_ITEM",
                payload: "toto",
            });
        });

        it("should CLEAR_ITEM", () => {
            const mojoActions = basicActionTypes("MOJO");
            expect(mojoActions.clearItem()).toEqual({
                type: "MOJO_CLEAR_ITEM",
            });
        });
    });
});
