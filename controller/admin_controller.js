const User = require("../database/models/user_management/users");

const get_user_form = (req, resp, next) => {
  resp.render("admin/add_user", { layout: "layoutb", user: req.session.user });
};

const add_user = (req, resp, next) => {
  console.log("Here")
  let newUser = new User({
    firstname: req.body.first_name,
    lastname: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phonenumber: req.body.phonenumber,
    user_type: req.body.user_type,
  });
  newUser.save((err, data) => {
    if (err) {
      console.log(err)
      return resp.redirect("/user");
    }else{
      return resp.redirect("/user");

    }
  });
};

module.exports = {
  add_user,
  get_user_form,
};
