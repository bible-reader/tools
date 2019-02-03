import { getHash } from "./utils";

describe("getHash()", () => {
  it("should always return the same thing for the same payload", () => {
    expect(getHash("hello")).toBe("aaf4c6");
    expect(getHash("hello", 4)).toBe("aaf4");
    expect(getHash("hello", 0)).toBe("");
    expect(getHash("xyz", 100)).toBe(
      "66b27417d37e024c46526c2f6d358a754fc552f3"
    );
    expect(getHash("xyz", 40)).toBe("66b27417d37e024c46526c2f6d358a754fc552f3");
    expect(getHash("hallo")).toBe("fd4cef");
    const obj = {
      x: "x",
      a: 2,
      o: {
        b: "b"
      }
    };
    expect(getHash(JSON.stringify(obj))).toBe("f13feb");
  });
  it("should return default length of 6", () => {
    expect(getHash("hello").length).toBe(6);
  });
  it("should accept length argument", () => {
    expect(getHash("hello", 10).length).toBe(10);
    expect(getHash("hello", 0).length).toBe(0);
  });
  it("should return hash with at most X characters", () => {
    expect(getHash("hello", 100).length).toBe(40);
  });
});
