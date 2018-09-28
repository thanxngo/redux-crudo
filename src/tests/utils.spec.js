/* eslint-env jest */

import { getns } from "../utils";

describe("Utils", () => {
    it("should return namespace", () => {
        const namespace = getns("mojo");
        expect(namespace("CREATE")).toEqual("mojo/CREATE");
    });
});
