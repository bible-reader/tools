import { ParserFunc } from "./types";

export const getParser: (format: string) => ParserFunc = (format: string) => {
  if (format) {
    const parser = require(`./parsers/${format}`).default;
    return parser;
  }
  throw new Error("No format string supplied.");
};

export { generate } from "./main";
