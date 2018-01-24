import parsePassage from ".";
import v11n from "../testData/kjvV11n";
import testPassages from "../testData/testPassages";

describe("parsePassage()", () => {
  testPassages.forEach(psg => {
    it(`should parse ${psg.book} ${psg.passage}`, () => {
      const parsed = parsePassage(v11n, psg.book, psg.passage);
      const expected = JSON.stringify(psg.expected);
      expect(JSON.stringify(parsed)).toEqual(expected);
    });
  });
});
