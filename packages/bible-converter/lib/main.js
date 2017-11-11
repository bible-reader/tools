"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-promise");
var utils_1 = require("./utils");
exports.writeChapters = function (bookPath, bookObj) { return __awaiter(_this, void 0, void 0, function () {
    var index, _a, _b, chapter, chapterPath, err_1, e_1_1, e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                index = 0;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 9, 10, 11]);
                _a = __values(bookObj.chapters), _b = _a.next();
                _d.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 8];
                chapter = _b.value;
                chapterPath = bookPath + "/ch" + utils_1.pad(index + 1 + "", 3) + ".json";
                _d.label = 3;
            case 3:
                _d.trys.push([3, 5, , 6]);
                return [4 /*yield*/, fs.writeFile(chapterPath, JSON.stringify(chapter))];
            case 4:
                _d.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _d.sent();
                console.error("Error writing file: ", err_1);
                return [3 /*break*/, 6];
            case 6:
                index++;
                _d.label = 7;
            case 7:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 8: return [3 /*break*/, 11];
            case 9:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 11];
            case 10:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.writeBookFolders = function (outputPath, bibleObj) { return __awaiter(_this, void 0, void 0, function () {
    var bookAliases, _loop_1, bookAliases_1, bookAliases_1_1, bookAlias, e_2_1, e_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                bookAliases = Object.keys(bibleObj.books);
                _loop_1 = function (bookAlias) {
                    var bookPath;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                bookPath = outputPath + "/" + bookAlias;
                                return [4 /*yield*/, fs
                                        .mkdirp(bookPath)
                                        .then(function () { return exports.writeChapters(bookPath, bibleObj.books[bookAlias]); })
                                        .catch(function (err) {
                                        if (err.code === "EEXIST") {
                                            return exports.writeChapters(bookPath, bibleObj.books[bookAlias]);
                                        }
                                        console.error("Error creating book folder: ", err);
                                        return err;
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                bookAliases_1 = __values(bookAliases), bookAliases_1_1 = bookAliases_1.next();
                _b.label = 2;
            case 2:
                if (!!bookAliases_1_1.done) return [3 /*break*/, 5];
                bookAlias = bookAliases_1_1.value;
                return [5 /*yield**/, _loop_1(bookAlias)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                bookAliases_1_1 = bookAliases_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (bookAliases_1_1 && !bookAliases_1_1.done && (_a = bookAliases_1.return)) _a.call(bookAliases_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.splitByChapters = function (outputPath, bibleObj) { return __awaiter(_this, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fs.mkdirp(outputPath)];
            case 1:
                _a.sent();
                return [4 /*yield*/, exports.writeBookFolders(outputPath, bibleObj)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                if (err_2.code === "EEXIST") {
                    return [2 /*return*/, exports.writeBookFolders(outputPath, bibleObj)];
                }
                else {
                    console.error("Error creating book folder: ", err_2);
                }
                return [3 /*break*/, 4];
            case 4:
                try {
                    fs.writeFile(outputPath + "/stats.json", JSON.stringify(bibleObj.stats));
                }
                catch (err) {
                    console.error("Error writing stats file: ", err);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.toOneJSONFile = function (outputPath, bibleObj) { return __awaiter(_this, void 0, void 0, function () {
    var err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fs.mkdirp(outputPath)];
            case 1:
                _a.sent();
                return [4 /*yield*/, fs.writeFile(outputPath + "/all.json", JSON.stringify(bibleObj))];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error("Error writing one complete JSON file: ", err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generate = function (outputPath, bibleObj) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.toOneJSONFile(outputPath, bibleObj)];
            case 1:
                _a.sent();
                return [4 /*yield*/, exports.splitByChapters(outputPath, bibleObj)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    generate: exports.generate,
    toOneJSONFile: exports.toOneJSONFile,
    splitByChapters: exports.splitByChapters,
    writeBookFolders: exports.writeBookFolders,
    writeChapters: exports.writeChapters
};
//# sourceMappingURL=main.js.map