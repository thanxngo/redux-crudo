/* eslint-env jest */

import Index from "../index";

describe("Index", () => {
    it("should export package", () => {
        expect(JSON.stringify(Index)).toMatchSnapshot();
    });
});
