import * as fs from "fs-promise";
import { pad } from "./utils";

import { IBibleObject, IBook } from "./types";

export const writeChapters = async (bookPath: string, bookObj: IBook) => {
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
  bibleObj: IBibleObject
) => {
  const bookAliases = Object.keys(bibleObj.books);
  for (const bookAlias of bookAliases) {
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
  }
};

export const splitByChapters = async (
  outputPath: string,
  bibleObj: IBibleObject
) => {
  try {
    await fs.mkdirp(outputPath);
    await writeBookFolders(outputPath, bibleObj);
  } catch (err) {
    if (err.code === "EEXIST") {
      return writeBookFolders(outputPath, bibleObj);
    } else {
      console.error("Error creating book folder: ", err);
    }
  }
  try {
    fs.writeFile(`${outputPath}/stats.json`, JSON.stringify(bibleObj.stats));
  } catch (err) {
    console.error("Error writing stats file: ", err);
  }
};

export const toOneJSONFile = async (
  outputPath: string,
  bibleObj: IBibleObject
) => {
  try {
    await fs.mkdirp(outputPath);
    await fs.writeFile(`${outputPath}/all.json`, JSON.stringify(bibleObj));
  } catch (err) {
    console.error("Error writing one complete JSON file: ", err);
  }
};

export const generate = async (outputPath: string, bibleObj: IBibleObject) => {
  await toOneJSONFile(outputPath, bibleObj);
  await splitByChapters(outputPath, bibleObj);
};

export default {
  generate,
  toOneJSONFile,
  splitByChapters,
  writeBookFolders,
  writeChapters
};