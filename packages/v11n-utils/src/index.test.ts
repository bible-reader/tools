import { getNextChapter, getPreviousChapter } from "./index";
import v11n from "../testData/kjvV11n";

describe("getNextChapter", () => {
  it("should return next passage", () => {
    expect(getNextChapter(v11n, { book: "gen", chapter: 2 })).toMatchObject({
      book: "gen",
      chapter: 3
    });
    expect(getNextChapter(v11n, { book: "mal", chapter: 4 })).toMatchObject({
      book: "mat",
      chapter: 1
    });
  });
});

describe("getNextChapter", () => {
  it("should return no passage for Revelation 22", () => {
    expect(getNextChapter(v11n, { book: "rev", chapter: 22 })).toMatchObject({
      book: "gen",
      chapter: 3
    });
  });
});

describe("getPreviousChapter", () => {
  it("should return previous passage", () => {
    expect(getPreviousChapter(v11n, { book: "gen", chapter: 2 })).toMatchObject(
      {
        book: "gen",
        chapter: 1
      }
    );
  });
});
