import { promises as fs } from "fs";
import { pad, getHash } from "./utils";

import { BibleVersionContent, Book } from "@bible-reader/types";

type Hash = string;

export interface BooksHashes {
  [bookId: string]: Hash;
}

export interface ChaptersHashes {
  [bookId: string]: Hash[]; // array of hashes corresponding to chapters
}

export const writeChapters = async (
  bookPath: string,
  bookObj: Book
): Promise<{ book: Hash; chapters: Hash[] }> => {
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
  return {
    book: bookHash,
    chapters: chaptersHashes
  };
};

export const writeBookFolders = async (
  outputPath: string,
  bibleObj: BibleVersionContent,
  updateProgress?: (progress: number, message: string) => void
) => {
  const booksHashes: BooksHashes = {};
  const chaptersHashes: ChaptersHashes = {};
  const bookAliases = Object.keys(bibleObj.books);
  for (let i = 0; i < bookAliases.length; i++) {
    const bookAlias = bookAliases[i];
    const bookPath = `${outputPath}/${bookAlias}`;
    await fs
      .mkdir(bookPath, { recursive: true })
      .then(() => writeChapters(bookPath, bibleObj.books[bookAlias]))
      .then(({ book, chapters }) => {
        booksHashes[bookAlias] = book;
        chaptersHashes[bookAlias] = chapters;
      })
      .catch((err) => {
        if (err.code === "EEXIST") {
          writeChapters(bookPath, bibleObj.books[bookAlias]).then(
            ({ book, chapters }) => {
              booksHashes[bookAlias] = book;
              chaptersHashes[bookAlias] = chapters;
            }
          );
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
  return {
    booksHashes,
    chaptersHashes
  };
};

export const splitByChapters = async (
  outputPath: string,
  bibleObj: BibleVersionContent,
  updateProgress?: (progress: number, message: string) => void
) => {
  let hashes;
  let descriptorHash = "";
  try {
    await fs.mkdir(outputPath, { recursive: true });
    hashes = await writeBookFolders(outputPath, bibleObj, updateProgress);
  } catch (err) {
    if (err.code === "EEXIST") {
      hashes = await writeBookFolders(outputPath, bibleObj, updateProgress);
    } else {
      console.error("Error creating book folders: ", err);
    }
  }
  if (hashes) {
    // Write descriptor - the file of all hashes and v11n
    const descriptor = {
      v11n: bibleObj.v11n,
      fragmentNumbers: bibleObj.fragmentNumbers,
      chapters: hashes.chaptersHashes,
      books: hashes.booksHashes
    };
    const descriptorPayload = JSON.stringify(descriptor);
    descriptorHash = getHash(descriptorPayload);
    const descriptorPath = `${outputPath}/descriptor.${descriptorHash}.json`;
    try {
      await fs.writeFile(descriptorPath, descriptorPayload);
    } catch (err) {
      console.error(`Error writing book hashfile for ${descriptorPath}: `, err);
    }
  }

  const v11nPayload = JSON.stringify(bibleObj.v11n);
  const v11nHash = getHash(v11nPayload);
  try {
    fs.writeFile(`${outputPath}/v11n.${v11nHash}.json`, v11nPayload);
  } catch (err) {
    console.error("Error writing v11n file: ", err);
  }

  const fragmentNumbersPayload = JSON.stringify(bibleObj.fragmentNumbers);
  const fragmentNumbersHash = getHash(fragmentNumbersPayload);
  try {
    fs.writeFile(
      `${outputPath}/fragmentNumbers.${fragmentNumbersHash}.json`,
      fragmentNumbersPayload
    );
  } catch (err) {
    console.error("Error writing fragmentNumbers file: ", err);
  }

  return descriptorHash;
};

export const toOneJSONFile = async (
  outputPath: string,
  bibleObj: BibleVersionContent
) => {
  const all = JSON.stringify(bibleObj);
  const hash = getHash(all);
  try {
    await fs.mkdir(outputPath, { recursive: true });
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
