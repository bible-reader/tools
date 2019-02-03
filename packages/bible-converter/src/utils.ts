import * as crypto from "crypto";

export function pad(n: string, width: number, z?: string) {
  z = z || "0";
  n += "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function getHash(payload: string, length: number = 8): string {
  const hash = crypto
    .createHash("sha1")
    .update(payload)
    .digest("hex");
  return hash.slice(0, length);
}
