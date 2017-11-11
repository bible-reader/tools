"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParser = function (format) {
    if (format) {
        var parser = require("./parsers/" + format).default;
        return parser;
    }
    throw new Error("No format string supplied.");
};
var main_1 = require("./main");
exports.generate = main_1.generate;
//# sourceMappingURL=index.js.map