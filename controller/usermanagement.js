const User = require("../database/models/user_management/users");

let index = (req, resp, next) => {
  // if (req.session.user) {

  //   resp.render("dashboard",{user:req.session.user});
  // }
  resp.render("guest/index", { layout: "layouta", name: "index" });
};



let login = (req, resp, next) => {
  resp.render("guest/login", { layout: "layouta",err:'' });
};



let logout = (req, resp, next) => {
  req.session.destroy((err) => {
    if (err) return err;
  });
  resp.redirect("/");
};



let authenticate_authorize = (req, resp, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      user.validation(req.body.password.toString()).then((passwordMatch) => {
        if (passwordMatch) {
          req.session.user = user;
          resp.redirect("/");
        } else {
          resp.render("guest/login", { layout: "layouta",err:'Incorrect Password' });
        }
      });
    } else {
      resp.render("guest/login", { layout: "layouta",err:'Incorrect Details' });
    }
  });
};

let signup = (req, resp, next) => {
  resp.render("guest/signup", { layout: "layouta", error: "" });
};

let register = (req, resp, next) => { 
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phonenumber: req.body.number,
  });
  newUser.save((err, data) => {
    if (err){ 
      console.log("la la ", err)
      resp.redirect("/");
  };
    req.session.user = data;
    resp.redirect("/");
  });
};


let user = (req, resp, next) => {
  let users = User.find({},(err,data)=>{
      if(err){
        resp.render("user/table", { layout: "layoutb", user: req.session.user });
      }else{
  resp.render("user/table", { layout: "layoutb", user: req.session.user ,data: data});

      }
  })
};


let guides = (req, resp, next) => {
  resp.send("user/guides", { layout: "layoutb", user: req.session.user });
};


let packages = (req, resp, next) => {
 
};


let apply_for_device = (req, resp, next) => {
  resp.render("user/vehicle_apply", {
    layout: "layoutb",
    user: req.session.user,
  });
};


let profile = (req, resp, next) => {
  User.findById(req.session.user["_id"])
    .then((user) => {
       resp.render("user/profile", { layout: "layoutb", user: user });
    })
    .then((err) => {
      //have to handle error
    });
};


//UPDATE DATABASE
let update_profile = (req, resp, next) => {

  User.findByIdAndUpdate(req.params.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
    username: req.body.username,
  }).then((data) => resp.redirect("/profile"));
};

let update_user_contact = (req, resp, next) => {

  User.findByIdAndUpdate(req.params.id, {
    address: req.body.address,
    country: req.body.country,
    city: req.body.city,
  })
    .then((data) => resp.redirect("/profile"))
  };

  let change_profile_pic = (req,resp,next)=>{
   User.findByIdAndUpdate(req.params.id, {
      profile: req.files[0]['filename']
      })
      .then((data) => {
      //have to
      resp.redirect("/profile")})
  };

module.exports = {
  index,
  login,
  signup,
  register,
  authenticate_authorize,
  logout,
  profile,
  user,
  guides,
  packages,
  apply_for_device,
  update_profile,
  update_user_contact,
  change_profile_pic

};
