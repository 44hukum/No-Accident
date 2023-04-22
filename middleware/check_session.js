const User = require("../database/models/user_management/users");
let check_sessions = (req, resp, next) => {
  if (req.session.user) {
    User.findById(req.session.user["_id"])
      .then((user) => {
        req.session.user = user;

        if(user.user_type=='admin'){
          return resp.redirect('/user')
  
        }else{
          return resp.render("user/dashboard", {
            layout: "layoutb",
            user: req.session.user,
          });
  
        }


      })
      .then((err) => {
        //have to handle error
      });   
  } else {
    next();
  }
};

module.exports = { check_sessions };
