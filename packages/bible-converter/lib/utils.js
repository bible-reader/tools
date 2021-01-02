"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHash = exports.pad = void 0;
const crypto = require("crypto");
function pad(n, width, z) {
    z = z || "0";
    n += "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
exports.pad = pad;
function getHash(payload, length = 6) {
    const hash = crypto.createHash("sha1").update(payload).digest("hex");
    return hash.slice(0, length);
}
exports.getHash = getHash;
//# sourceMappingURL=utils.js.map