const { request } = require("express");
const Package = require("../database/models/package/package");
const User = require("../database/models/user_management/users");
const PackageRequest = require("../database/models/package/request_for_package");

let get_package = (req, resp) => {
  Package.find({}, (err, data) => {
    if (err) {
      resp.render("user/available_packages", {
        layout: "layoutb",
        user: req.session.user,
        package: null,
      });
    } else {
      console.log(data);
      resp.render("user/available_packages", {
        layout: "layoutb",
        user: req.session.user,
        package: data,
      });
    }
  });
};

let add_package = (req, resp, next) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      const pack = new Package({
        package_name: req.body.name,
        package_description: req.body.description,
        package_features: req.body.features,
        added_by: data,
      });
      pack.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("done");
          resp.redirect("/package");
        }
      });
    })
    .then((err) => {
      console.log(err);
    });
};

let update_package = (req, resp, next) => {
  Package.findByIdAndUpdate(req.params.id, {
    package_name: req.body.name,
    package_features: req.body.features,
  }).then((data) => resp.redirect("/"));
};

let delete_package = (req, resp, next) => {};

let apply_for_Package = (req, resp, next) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      let newRequest = new PackageRequest({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        vehicle_number: req.body.vehicle_number,
        vehicle_type: req.body.vehicle_type,
        requested_by: data,
      });
      newRequest.save((err, data) => {
        if (err) console.log("la la ", err);
        resp.redirect("/");
      });
    })
    .then((err) => {
      console.log(err);
    });
};

let edit_package = (req, resp, next) => {
   Package.findByIdAndDelete({_id:req.params.id},(err,data)=>{
    if (err) {
      resp.redirect('/');
    } else {
      resp.redirect('/');
    }
  })
};



let verify_package = (req, resp, next) => {
    PackageRequest.find({},(err,data)=>{
      if (err) {
        resp.render("user/package_verification.ejs", {
          layout: "/layoutb",
          user: req.session.user,
          package: [],
        });
      } else {
        console.log("package_verification",data);
        resp.render("user/package_verification.ejs", {
          layout: "layoutb",
          user: req.session.user,
          package: data,
        });
      }
    })
};

module.exports = {
  get_package,
  add_package,
  update_package,
  edit_package,
  apply_for_Package,
  verify_package,
};
