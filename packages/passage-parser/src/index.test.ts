import parsePassage from ".";
import stats from "../testData/kjvStats";
import testPassages from "../testData/testPassages";

describe("parsePassage()", () => {
  testPassages.forEach(psg => {
    it(`should parse ${psg.book} ${psg.passage}`, () => {
      const parsed = parsePassage(stats, psg.book, psg.passage);
      const expected = JSON.stringify(psg.expected);
      expect(JSON.stringify(parsed)).toEqual(expected);
    });
  });
});
