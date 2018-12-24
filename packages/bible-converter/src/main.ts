import * as fs from "fs-promise";
import { pad } from "./utils";

import { BibleVersionContent, Book } from "@bible-reader/types";

export const writeChapters = async (bookPath: string, bookObj: Book) => {
  let index = 0;
  for (const chapter of bookObj.chapters) {
    const chapterPath = `${bookPath}/ch${pad(index + 1 + "", 3)}.json`;
    try {
      await fs.writeFile(chapterPath, JSON.stringify(chapter));
    } catch (err) {
      console.error("Error writing file: ", err);
    }
    index++;
  }
};

export const writeBookFolders = async (
  outputPath: string,
  bibleObj: BibleVersionContent,
  updateProgress?: (progress: number, message: string) => void
) => {
  const bookAliases = Object.keys(bibleObj.books);
  for (let i = 0; i < bookAliases.length; i++) {
    const bookAlias = bookAliases[i];
    const bookPath = `${outputPath}/${bookAlias}`;
    await fs
      .mkdirp(bookPath)
      .then(() => writeChapters(bookPath, bibleObj.books[bookAlias]))
      .catch(err => {
        if (err.code === "EEXIST") {
          return writeChapters(bookPath, bibleObj.books[bookAlias]);
        }
        console.error("Error creating book folder: ", err);
        return err;
      });
    if (updateProgress) {
      updateProgress(
        (i + 1) / bookAliases.length,
        "Writing JSON files of " + bookAlias
      );
    }
  }
};

export const splitByChapters = async (
  outputPath: string,
  bibleObj: BibleVersionContent,
  updateProgress?: (progress: number, message: string) => void
) => {
  try {
    await fs.mkdirp(outputPath);
    await writeBookFolders(outputPath, bibleObj, updateProgress);
  } catch (err) {
    if (err.code === "EEXIST") {
      return writeBookFolders(outputPath, bibleObj, updateProgress);
    } else {
      console.error("Error creating book folder: ", err);
    }
  }
  try {
    fs.writeFile(`${outputPath}/v11n.json`, JSON.stringify(bibleObj.v11n));
  } catch (err) {
    console.error("Error writing v11n file: ", err);
  }
};

export const toOneJSONFile = async (
  outputPath: string,
  bibleObj: BibleVersionContent
) => {
  try {
    await fs.mkdirp(outputPath);
    await fs.writeFile(`${outputPath}/all.json`, JSON.stringify(bibleObj));
  } catch (err) {
    console.error("Error writing one complete JSON file: ", err);
  }
};

export const generate = async (
  outputPath: string,
  bibleObj: BibleVersionContent,
  updateProgress?: (progress: number, message: string) => void
) => {
  if (updateProgress) {
    updateProgress(0, "Writing one JSON file");
  }
  await toOneJSONFile(outputPath, bibleObj);
  await splitByChapters(outputPath, bibleObj, updateProgress);
};

export default {
  generate,
  toOneJSONFile,
  splitByChapters,
  writeBookFolders,
  writeChapters
};
