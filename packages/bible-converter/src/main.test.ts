import * as path from "path";
import * as fs from "fs-promise";

import parse from "./parsers/opensong";
import { generate, BooksHashes, ChaptersHashes } from "./main";

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
      .then(
        (
          hashes:
            | {
                booksHashes: BooksHashes;
                chaptersHashes: ChaptersHashes;
              }
            | undefined
        ) => {
          let booksHashes;
          let chaptersHashes;
          if (hashes) {
            booksHashes = hashes.booksHashes;
            chaptersHashes = hashes.chaptersHashes;
          }
          expect(JSON.stringify(booksHashes)).toBe(
            '{"gen":"65bd48","exo":"e22dea","lev":"bbdf85","num":"bbdf85","deu":"bbdf85"}'
          );
          expect(JSON.stringify(chaptersHashes)).toBe(
            '{"gen":["f94fc7","e344bf","3749df","0ef77a","2d46a0","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8"],"exo":["6866a6","627a6e","d983a3","e77989","a610f9","8be65b","008121","3ac0a6","26f7fc","c33325","5e26d3","89d893","2b89bb","4f9a83","13859a","8900d3","ef9a6d","f634c5","d93529","626c73","d95c63","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8","d72ed8"],"lev":["d72ed8","d72ed8","d72ed8"],"num":["d72ed8","d72ed8","d72ed8"],"deu":["d72ed8","d72ed8","d72ed8"]}'
          );
          done();
        }
      )
      .catch(err => {
        throw new Error(err.message);
      });
  });
});
