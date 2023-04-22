const router = require("express").Router();

/**
 * Controller
 */

const {
  index,
  login,
  signup,
  register,
  authenticate_authorize,
  logout,
  profile,
  user,
  guides,
  apply_for_device,
  update_user_contact,
  update_profile,
  change_profile_pic,
  renderer,
  guest_inqueries,
  view_inqueries,
  update_inquery_status,
  verify_package
} = require("../controller/usermanagement");

const {add_user, get_user_form } = require('../controller/admin_controller')
const { get_data,inqueries } = require("../controller/user_vehicle_data");

/**
 *  Middleware
 */
const { user_exist } = require("../middleware/find_user");
const { check_sessions} = require("../middleware/check_session");
const { check_access_sessions } = require("../middleware/check_access_session");



const multer = require('multer');

const storage = multer.diskStorage({
  //store excel file
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "profile" + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.get("/", check_sessions, index);

router.post("/", check_sessions, index);
// router.get("/",(req,resp)=>{
//   resp.render('vehicle_apply')
// })

router.get("/login", check_sessions, login);
router.post("/login", check_sessions, authenticate_authorize);
router.get("/signup", check_sessions, signup);
router.post("/signup", check_sessions, user_exist, register);

router.get("/user",check_access_sessions,user)
router.get("/guides",check_access_sessions,guides)
router.get("/apply",check_access_sessions,apply_for_device)
router.get("/logout", logout);


router.get("/profile",check_access_sessions,profile)
router.post("/updateuser/:id",check_access_sessions,update_profile); //update user
router.post("/updateuser/updatecontact/:id",check_access_sessions,update_user_contact); //update user address
router.post('/upload/:id',check_access_sessions,upload.any('profile'),change_profile_pic);


router.get("/add_user",check_access_sessions,user_exist,get_user_form);
router.post("/admin/add_user",check_access_sessions,user_exist,add_user);

router.get("/dashboard",check_access_sessions,get_data);

router.get("/render",check_access_sessions,renderer);

router.post("/contact", guest_inqueries);
router.get("/inqueries",check_access_sessions,view_inqueries);
router.get("/resolved/:id",check_access_sessions,update_inquery_status);

router.get("/verifyPackage",check_access_sessions,verify_package);

module.exports = router;
