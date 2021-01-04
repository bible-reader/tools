"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHash = exports.generate = exports.getParser = void 0;
const getParser = (format) => {
    if (format) {
        const parser = require(`./parsers/${format}`).default;
        return parser;
    }
    throw new Error("No format string supplied.");
};
exports.getParser = getParser;
var main_1 = require("./main");
Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return main_1.generate; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "getHash", { enumerable: true, get: function () { return utils_1.getHash; } });
//# sourceMappingURL=index.js.map