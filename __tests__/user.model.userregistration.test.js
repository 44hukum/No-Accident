
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/testNoAccident", {
  useNewUrlParser: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: `);
});

// USER REGISTRATION CHECKUP
const User = require("../database/models/user_management/users");

describe("User Registration", () => {
  it("User Registration process testing", async () => {
    try {
      let newUser = await new User({
        firstname: "ram",
        lastname: "hari",
        phonenumber: "9803251923",
        email: "ram@gmail.com",
        password: "hymanwhatisup321",
      }).save();
      expect(Object.keys(newUser._doc)).toEqual(
        expect.arrayContaining(["firstname", "lastname", "email"])
      );
    } catch (err) {
      throw new Error(err);
    }
  });
});

afterEach(async () => {
  try {
    await User.deleteMany({});
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});
