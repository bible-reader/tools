import {
  chapterExists,
  verseExists,
  getNextChapter,
  getPreviousChapter
} from "./index";

import v11n from "../testData/kjvV11n";

describe("chapterExists", () => {
  it("should return True if chapter exists", () => {
    expect(chapterExists(v11n, "gen", 1)).toBe(true);
    expect(chapterExists(v11n, "mat", 28)).toBe(true);
  });

  it("should return False if chapter does NOT exist", () => {
    expect(chapterExists(v11n, "gen", 55)).toBe(false);
    expect(chapterExists(v11n, "mat", 29)).toBe(false);
  });
});

describe("verseExists", () => {
  it("should return True if verse exists", () => {
    expect(verseExists(v11n, "gen", 1, 1)).toBe(true);
    expect(verseExists(v11n, "mat", 2, 10)).toBe(true);
  });

  it("should return False if verse does NOT exist", () => {
    expect(verseExists(v11n, "gen", 50, 50)).toBe(false);
    expect(verseExists(v11n, "mat", 28, 30)).toBe(false);
  });
});

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

  it("should return no passage for Revelation 22", () => {
    expect(getNextChapter(v11n, { book: "rev", chapter: 22 })).toBeNull();
  });

  it("should return null for non-existing chapter", () => {
    expect(getNextChapter(v11n, { book: "mal", chapter: 40 })).toBeNull();
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
    expect(getPreviousChapter(v11n, { book: "mat", chapter: 1 })).toMatchObject(
      {
        book: "mal",
        chapter: 4
      }
    );
  });

  it("should return no passage for Genesis 1", () => {
    expect(getPreviousChapter(v11n, { book: "gen", chapter: 1 })).toBeNull();
  });

  it("should return null for non-existing chapter", () => {
    expect(getPreviousChapter(v11n, { book: "mal", chapter: 40 })).toBeNull();
  });
});
