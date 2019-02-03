import * as fs from "fs-promise";
import { pad, getHash } from "./utils";

import { BibleVersionContent, Book } from "@bible-reader/types";

type Hash = string;

interface BooksHashes {
  [bookId: string]: Hash;
}

export const writeChapters = async (
  bookPath: string,
  bookObj: Book
): Promise<Hash> => {
  let index = 0;
  const chaptersHashes = [];
  for (const chapter of bookObj.chapters) {
    const payload = JSON.stringify(chapter);
    const hash = getHash(payload);
    const chapterKey = pad(index + 1 + "", 3);
    const chapterPath = `${bookPath}/ch${chapterKey}.${hash}.json`;
    chaptersHashes.push(hash);
    try {
      await fs.writeFile(chapterPath, payload);
    } catch (err) {
      console.error(`Error writing file ${chapterPath}: `, err);
    }
    index++;
  }
  // Write hashfile for whole book folder
  const bookPayload = JSON.stringify(chaptersHashes);
  const bookHash = getHash(bookPayload);
  const bookHashfilePath = `${bookPath}/hashfile.${bookHash}.json`;
  try {
    await fs.writeFile(bookHashfilePath, bookPayload);
  } catch (err) {
    console.error(`Error writing book hashfile for ${bookPath}: `, err);
  }
  return bookHash;
};

export const writeBookFolders = async (
  outputPath: string,
  bibleObj: BibleVersionContent,
  updateProgress?: (progress: number, message: string) => void
) => {
  const booksHashes: BooksHashes = {};
  const bookAliases = Object.keys(bibleObj.books);
  for (let i = 0; i < bookAliases.length; i++) {
    const bookAlias = bookAliases[i];
    const bookPath = `${outputPath}/${bookAlias}`;
    await fs
      .mkdirp(bookPath)
      .then(() => writeChapters(bookPath, bibleObj.books[bookAlias]))
      .then(bookHash => {
        booksHashes[bookAlias] = bookHash;
      })
      .catch(err => {
        if (err.code === "EEXIST") {
          writeChapters(bookPath, bibleObj.books[bookAlias]).then(bookHash => {
            booksHashes[bookAlias] = bookHash;
          });
        }
        console.error("Error creating book folder: ", err);
      });
    if (updateProgress) {
      updateProgress(
        (i + 1) / bookAliases.length,
        "Writing JSON files of " + bookAlias
      );
    }
  }
  // Write hashfile for whole book folder
  const booksHashesPayload = JSON.stringify(booksHashes);
  const booksHashesHash = getHash(booksHashesPayload);
  const booksHashesHashfilePath = `${outputPath}/booksHashes.${booksHashesHash}.json`;
  try {
    await fs.writeFile(booksHashesHashfilePath, booksHashesPayload);
  } catch (err) {
    console.error(
      `Error writing book hashfile for ${booksHashesHashfilePath}: `,
      err
    );
  }
  return booksHashes;
};

export const splitByChapters = async (
  outputPath: string,
  bibleObj: BibleVersionContent,
  updateProgress?: (progress: number, message: string) => void
) => {
  let booksHashes;
  try {
    await fs.mkdirp(outputPath);
    booksHashes = await writeBookFolders(outputPath, bibleObj, updateProgress);
  } catch (err) {
    if (err.code === "EEXIST") {
      booksHashes = writeBookFolders(outputPath, bibleObj, updateProgress);
    } else {
      console.error("Error creating book folders: ", err);
    }
  }
  const v11nPayload = JSON.stringify(bibleObj.v11n);
  const v11nHash = getHash(v11nPayload);
  try {
    fs.writeFile(`${outputPath}/v11n.${v11nHash}.json`, v11nPayload);
  } catch (err) {
    console.error("Error writing v11n file: ", err);
  }
  return booksHashes;
};

export const toOneJSONFile = async (
  outputPath: string,
  bibleObj: BibleVersionContent
) => {
  const all = JSON.stringify(bibleObj);
  const hash = getHash(all);
  try {
    await fs.mkdirp(outputPath);
    await fs.writeFile(`${outputPath}/all.${hash}.json`, all);
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
  return splitByChapters(outputPath, bibleObj, updateProgress);
};

export default {
  generate,
  toOneJSONFile,
  splitByChapters,
  writeBookFolders,
  writeChapters
};
