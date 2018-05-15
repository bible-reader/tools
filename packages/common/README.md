# Common dependencies for Scripture App packages

This package currently stores data dependencies such as:

* order of Bible books
* list of one-chapter Bible books

## How to use

```typescript
import {
  oneChapterBooks,
  booksOrder,
  bookNumbers
} from "@bible-reader/common";

const verseReference = {
  book: "gen",
  chapter: 1,
  verse: 1
};

const bookIndex = bookNumbers[verseReference.book];

function listOneChapterBooks() {
  oneChapterBooks.forEach(index => {
    // prints id of books, like gen. exo, lev, ...
    console.log(booksOrder[index]);
  });
}
```
