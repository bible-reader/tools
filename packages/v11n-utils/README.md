# Utilities to work with v11n - versification

## How to use

```typescript
import { getNextChapter } from "@bible-reader/common";
import v11n from "../testData/kjvV11n";

const currentChapter = { book: "gen", chapter: 1 };
const nextChapter = getNextChapter(v11n, currentChapter);

console.log(
  `The next chapter after ${currentChapter.book} ${currentChapter.chapter} is ${
    nextChapter.book
  } ${nextChapter.chapter}`
);
```
