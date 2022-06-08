const validId = require("./validId");

describe(validId, () => {
  it("should return true if id is valid", () => {
    const objectId = "616005cae3c8e880c13dc0b9";
    const received = validId(objectId);
    expect(received).toEqual(true);
  });
  it("should return false if the id is invalid", () => {
    const object = "invalid-id";
    const received = validId(object);
    expect(received).toEqual(false);
  });
});
