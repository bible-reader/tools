import * as path from "path";
import { fs } from "mz";

import { Passage } from "@scripture-app/common";
import parsePassage from "@scripture-app/passage-parser";
import validateReadingPlan from ".";
import v11n from "../testData/kjvV11n";

async function readData() {
  try {
    let i = 0;
    const data = await fs.readFile(
      path.join(__dirname, "..", "testData", "nt.csv"),
      "utf-8"
    );
    const rows = data.toString().split("\n");
    const passages: Array<Passage> = [];
    const dates: string[] = [];
    for (let row of rows) {
      const fields = row.split("#");
      dates[i] = fields[0].trim();
      passages[i] = parsePassage(v11n, fields[1].trim(), fields[2].trim());
      i++;
    }
    const errors = validateReadingPlan(passages, v11n, true);
    for (let error of errors) {
      console.log(
        `Error "${error.message}" in passage "${rows[error.passageIndex]}".`
      );
    }
  } catch (error) {
    console.error(error);
  }
}

readData();
