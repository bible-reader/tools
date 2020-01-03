export default [
  {
    book: "gen",
    passage: "1,1-2",
    expected: {
      bookNameShort: "gen",
      bookNumber: 1,
      startChapter: 1,
      startVerse: 1,
      endChapter: 1,
      endVerse: 2
    }
  },
  {
    book: "gen",
    passage: "1:1-2", // colon here
    expected: {
      bookNameShort: "gen",
      bookNumber: 1,
      startChapter: 1,
      startVerse: 1,
      endChapter: 1,
      endVerse: 2
    }
  },
  {
    book: "exo",
    passage: "4,3-5,5",
    expected: {
      bookNameShort: "exo",
      bookNumber: 2,
      startChapter: 4,
      startVerse: 3,
      endChapter: 5,
      endVerse: 5
    }
  },
  {
    book: "exo",
    passage: "4:3-5:5", // colon here
    expected: {
      bookNameShort: "exo",
      bookNumber: 2,
      startChapter: 4,
      startVerse: 3,
      endChapter: 5,
      endVerse: 5
    }
  },
  {
    book: "lev",
    passage: "4",
    expected: {
      bookNameShort: "lev",
      bookNumber: 3,
      startChapter: 4,
      startVerse: 1,
      endChapter: 4,
      endVerse: 35
    }
  },
  {
    book: "num",
    passage: "5-10",
    expected: {
      bookNameShort: "num",
      bookNumber: 4,
      startChapter: 5,
      startVerse: 1,
      endChapter: 10,
      endVerse: 36
    }
  },
  {
    book: "deu",
    passage: "5-10,12",
    expected: {
      bookNameShort: "deu",
      bookNumber: 5,
      startChapter: 5,
      startVerse: 1,
      endChapter: 10,
      endVerse: 12
    }
  },
  {
    book: "oba",
    passage: "2-10",
    expected: {
      bookNameShort: "oba",
      bookNumber: 31,
      startChapter: 1,
      startVerse: 2,
      endChapter: 1,
      endVerse: 10
    }
  },
  {
    book: "phm",
    passage: "1, 2 - 10",
    expected: {
      bookNameShort: "phm",
      bookNumber: 57,
      startChapter: 1,
      startVerse: 2,
      endChapter: 1,
      endVerse: 10
    }
  },
  {
    book: "jud",
    passage: "2",
    expected: {
      bookNameShort: "jud",
      bookNumber: 65,
      startChapter: 1,
      startVerse: 2,
      endChapter: 1,
      endVerse: 2
    }
  },
  {
    book: "deu",
    passage: "5:3-e", // to the end of the chapter
    expected: {
      bookNameShort: "deu",
      bookNumber: 5,
      startChapter: 5,
      startVerse: 3,
      endChapter: 5,
      endVerse: 33
    }
  },
  {
    book: "deu",
    passage: "5-10:e", // to the end of the chapter
    expected: {
      bookNameShort: "deu",
      bookNumber: 5,
      startChapter: 5,
      startVerse: 1,
      endChapter: 10,
      endVerse: 22
    }
  }
];
