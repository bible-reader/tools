import * as path from "path";
import * as fs from "fs-promise";

import parse from "./parsers/opensong";
import { generate } from "./main";

import { BibleVersionContent } from "@bible-reader/types";

describe("generate()", () => {
  it("should create a structure of files", done => {
    const testFilePath = path.join(
      __dirname,
      "parsers/opensong/KJV_test_sample.xmm"
    );
    const name = testFilePath;
    const outputPath = path.join(
      __dirname,
      "..",
      "testTmp/output/KJV_test_sample"
    );

    fs
      .readFile(testFilePath, "utf8")
      .then(data => parse(data, "kjv", name, "en"))
      .then((bibleObj: BibleVersionContent) => {
        expect(bibleObj.name).toEqual(testFilePath);
        return generate(outputPath, bibleObj);
      })
      .then(booksHashes => {
        expect(JSON.stringify(booksHashes)).toBe(
          '{"gen":"65bd48","exo":"e22dea","lev":"bbdf85","num":"bbdf85","deu":"bbdf85"}'
        );
        done();
      })
      .catch(err => {
        throw new Error(err.message);
      });
  });
});
