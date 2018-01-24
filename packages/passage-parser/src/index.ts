import { organization } from "@scripture-app/common";
import { Passage, BookNumbers, Versification } from "@scripture-app/common";

const { booksOrder, oneChapterBooks } = organization;

function parsePassage(
  v11n: Versification,
  bookNameShort: string,
  passageString: string
) {
  const bookNumbers: BookNumbers = {};
  let index = 1;
  for (let bookShortName of booksOrder) {
    bookNumbers[bookShortName] = index;
    index++;
  }

  const passage: Passage = {
    bookNameShort: "",
    bookNumber: 0,
    startChapter: 0,
    startVerse: 0,
    endChapter: 0,
    endVerse: 0
  };

  passage.bookNameShort = bookNameShort;
  passage.bookNumber = bookNumbers[bookNameShort];

  const isOneChapterBook = oneChapterBooks.indexOf(passage.bookNumber) >= 0;

  const passageParts = passageString.split("-");
  const passageStart = passageParts[0].trim();
  const passageStartParts = passageStart.split(",");

  // Parsing first part (before "-")
  if (passageStartParts.length > 1) {
    // Chapter and verse were specified
    passage.startChapter = parseInt(passageStartParts[0].trim());
    passage.startVerse = parseInt(passageStartParts[1].trim());

    if (isOneChapterBook && passage.startChapter > 1) {
      passage.invalidRef = true;
      passage.invalidRefMessage = "INVALID_REF_BOOK_HAS_ONLY_ONE_CHAPTER";
    }
  } else {
    if (isOneChapterBook) {
      passage.startVerse = parseInt(passageStartParts[0].trim());
      passage.startChapter = 1;
    } else {
      // Only chapter number was specified (meaning all verses of the chapter)
      passage.startChapter = parseInt(passageStartParts[0].trim());
      passage.startVerse = 1;
    }
  }

  // Parsing second part (after "-")
  if (passageParts.length > 1) {
    const passageEnd = passageParts[1].trim();
    const passageEndParts = passageEnd.split(",");
    if (passageEndParts.length == 1) {
      if (passageStartParts.length === 1) {
        if (isOneChapterBook) {
          passage.endChapter = 1;
          passage.endVerse = parseInt(passageEndParts[0].trim());
        } else {
          // works for multichapter passages, like Gen. 1-3
          passage.endChapter = parseInt(passageEndParts[0].trim());
          passage.endVerse =
            v11n[passage.bookNameShort][passage.endChapter - 1];
        }
      } else {
        passage.endChapter = passage.startChapter;
        passage.endVerse = parseInt(passageEndParts[0].trim());
      }
    } else if (passageEndParts.length == 2) {
      passage.endChapter = parseInt(passageEndParts[0].trim());
      passage.endVerse = parseInt(passageEndParts[1].trim());
      if (isOneChapterBook && passage.endChapter > 1) {
        passage.invalidRef = true;
        passage.invalidRefMessage = "INVALID_REF_BOOK_HAS_ONLY_ONE_CHAPTER";
      }
    }
  } else {
    // There is no second part
    if (passageStartParts.length > 1 || isOneChapterBook) {
      // in case there is just one verse:
      passage.endChapter = passage.startChapter;
      passage.endVerse = passage.startVerse;
    } else {
      passage.endChapter = passage.startChapter;
      passage.endVerse = v11n[passage.bookNameShort][passage.endChapter - 1];
    }
  }

  return passage;
}

export default parsePassage;
