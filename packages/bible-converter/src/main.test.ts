import { expect } from "chai";

import parse from "./parsers/opensong";
import { generate } from "./main";

import { IBibleObject } from "./types";

describe("generate()", () => {
  it("should create a structure of files", done => {
    const testFilePath = "./src/parsers/opensong/KJV_test_sample.xmm";
    const outputPath = "./testTmp/output/KJV_test_sample";

    parse(testFilePath)
      .then((bibleObj: IBibleObject) => {
        expect(bibleObj.name).to.equal(testFilePath);
        return generate(outputPath, bibleObj);
      })
      .then(() => {
        done();
      })
      .catch(err => {
        throw new Error(err.message);
      });
  });
});
