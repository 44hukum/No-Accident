// File: __tests__/user.model.test.js
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

describe("User Login testing", () => {
  it("User Login", async () => {
    try {
        // CREATES A NEW USER 
      let newUser = await new User({
        firstname: "ram",
        lastname: "hari",
        phonenumber: "9803251923",
        email: "ram@gmail.com",
        password: "hymanwhatisup321",
      }).save();
    //   Find the newly created user

        let user= User.findOne({email:'ram@gmail.com'}).then((data)=>{
           if(data){
               data.validation("hymanwhatisup321").then((match)=>{
                expect(match).toEqual(true)
               })
           }
        });
      
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
