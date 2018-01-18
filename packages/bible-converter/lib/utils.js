"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pad(n, width, z) {
    z = z || "0";
    n += "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
exports.pad = pad;
exports.default = {
    pad
};
//# sourceMappingURL=utils.js.map