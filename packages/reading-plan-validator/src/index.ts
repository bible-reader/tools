import { Versification, Passage } from "@scripture-app/common";

type Error = {
  passageIndex: number;
  isError: boolean;
  message: string;
};

function validateReadingPlan(
  passages: Array<Passage>,
  versification: Versification,
  checkContinuity: boolean = true
) {
  const errors: Array<Error> = [];

  let i = 0;

  for (let passage of passages) {
    const error: Error = {
      passageIndex: i,
      isError: false,
      message: ""
    };

    // checking verses
    if (versification[passage.bookNameShort][passage.startChapter - 1]) {
      if (
        passage.startVerse >
        versification[passage.bookNameShort][passage.startChapter - 1]
      ) {
        error.isError = true;
        error.message +=
          "The starting verse number exceeds the number of verses in the chapter. ";
      }
    } else {
      error.isError = true;
      error.message += "The chapter does not exist. ";
    }

    // ending verse check
    if (versification[passage.bookNameShort][passage.endChapter - 1]) {
      if (
        passage.endVerse >
        versification[passage.bookNameShort][passage.endChapter - 1]
      ) {
        error.isError = true;
        error.message +=
          "The ending verse number exceeds the number of verses in the chapter. ";
      }
    } else {
      error.isError = true;
      error.message += "The chapter does not exist. ";
    }

    // pro-active swapping of chapter and verse numbers in case the starting > the ending
    if (passage.startChapter <= passage.endChapter) {
      if (passage.startVerse > passage.endVerse) {
        error.isError = true;
        error.message += "End verse lesser than starting verse - swapped. ";
        const sw = passage.endVerse;
        passage.endVerse = passage.startVerse;
        passage.startVerse = sw;
      }
    } else {
      error.isError = true;
      error.message += "End chapter lesser than starting chapter - swapped. ";
      const sw = passage.endChapter;
      passage.endChapter = passage.startChapter;
      passage.startChapter = sw;
    }

    // checking continuity
    if (checkContinuity && i > 0) {
      if (passages[i - 1].bookNumber == passage.bookNumber) {
        if (passages[i - 1].endChapter == passage.startChapter) {
          if (passages[i - 1].endVerse !== passage.startVerse - 1) {
            error.isError = true;
            error.message += "Discontinuity: Verse(s) skipped. ";
          }
        } else {
          if (
            passages[i - 1].endVerse <
            versification[passages[i - 1].bookNameShort][
              passages[i - 1].endChapter - 1
            ]
          ) {
            error.isError = true;
            error.message += "Discontinuity: Previous chapter was not closed. ";
          }
          if (passage.startVerse !== 1) {
            error.isError = true;
            error.message +=
              "Discontinuity: New chapter does not start with verse 1. ";
          }
        }
      } else {
        if (
          passages[i - 1].endVerse <
          versification[passages[i - 1].bookNameShort][
            passages[i - 1].endChapter - 1
          ]
        ) {
          error.isError = true;
          error.message += "Discontinuity: Previous chapter was not closed. ";
        }
        if (passage.startVerse !== 1) {
          error.isError = true;
          error.message +=
            "Discontinuity: New book does not start with verse 1. ";
        }
      }
    }

    if (error.isError) {
      errors.push(error);
    }

    i++;
  } // end for..of loop

  return errors;
}

export default validateReadingPlan;
