const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/testNoAccident", {
  useNewUrlParser: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: `);
});

// Package  Management
const Package = require("../database/models/package/package");
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

      let user_id;
      let user = User.findOne({ email: "ram@gmail.com" }).then((data) => {
        if (data) {
          data.validation("hymanwhatisup321").then((match) => {
            user_id: data["_id"];
          });
        }
        let newPackage = async () => {
          await new Package({
            package_name: "no_accident",
            package_description: "First prototype for No Accident",
            package_feature: ["speed control", "tilting control"],
            added_by: user_id,
          }).save();

          expect(Object.keys(newPackage._doc)).toEqual(
            expect.arrayContaining([
              "package_name",
              "package_description",
              "package_feature",
            ])
          );
        };
      });
    } catch (err) {
      throw new Error(err);
    }
  });
});

// afterEach(async () => {

// });

afterAll(async () => {
  try {
    await User.deleteMany({});
  } catch (err) {
    console.log(err);
  }

  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});
