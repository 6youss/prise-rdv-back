const assert = require("assert");

const User = require("../models/User");

//describe tests
describe("Finding records", () => {
  //Create tests
  it("Finds one record in the database", async () => {
    const user = await User.findOne({ name: "admin" });
    assert(user.name === "admin");
  });
});
