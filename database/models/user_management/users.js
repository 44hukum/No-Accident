const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    password: String,
    username:{
      type: String,
      default: ''
    },
    phonenumber: {
      type: String,
      unique: 'required phonenumber',

    },
    is_active:{
      type: String,
      enum:['active','inactive'],
      default:'inactive',
    },
    email: {
      type: String,
      unique: 'email already exist',
      // match: [ /. +\@. +\.. + /, 'Please give a valid email address' ]
    },
    user_type: {
      type: String,
      enum: ["admin", "user","police", "guest"],
      default: "user",
    },
    address:{
      type: String,
      default:'NON'
    },
    city:{
      type: String,
      default:'NON'
    },
    country:{
      type: String,
      default:'NON'
    },
    profile:{
      type: String,
      default:'NON'
    }

  },

  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      console.log("error");
      next(err);
    });
});
userSchema.methods.validation = async function (inputPassword) {
  // let pass= '"'+inputPassword+'"';
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
