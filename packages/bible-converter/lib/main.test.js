"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-promise");
const opensong_1 = require("./parsers/opensong");
const main_1 = require("./main");
describe("generate()", () => {
    it("should create a structure of files", done => {
        const testFilePath = "./src/parsers/opensong/KJV_test_sample.xmm";
        const name = testFilePath;
        const outputPath = "./testTmp/output/KJV_test_sample";
        fs
            .readFile(testFilePath, "utf8")
            .then(data => opensong_1.default(data, name))
            .then((bibleObj) => {
            expect(bibleObj.name).toEqual(testFilePath);
            return main_1.generate(outputPath, bibleObj);
        })
            .then(() => {
            done();
        })
            .catch(err => {
            throw new Error(err.message);
        });
    });
});
//# sourceMappingURL=main.test.js.map