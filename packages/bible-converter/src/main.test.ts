import { expect } from "chai";
import * as fs from "fs-promise";

import parse from "./parsers/opensong";
import { generate } from "./main";

import { IBibleObject } from "./types";

describe("generate()", () => {
  it("should create a structure of files", done => {
    const testFilePath = "./src/parsers/opensong/KJV_test_sample.xmm";
    const name = testFilePath;
    const outputPath = "./testTmp/output/KJV_test_sample";

    fs
      .readFile(testFilePath, "utf8")
      .then(data => parse(data, name))
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
