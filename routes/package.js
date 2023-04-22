const router2 = require("express").Router();
const { get_package,add_package,update_package,edit_package,apply_for_Package, verify_package } = require("../controller/package_for_user")
const { check_access_sessions } = require("../middleware/check_access_session");
const router = require("./web");



router2.get('/',check_access_sessions,get_package);
router2.post('/update/:id',check_access_sessions,add_package);

// router2.post('/:id',check_access_sessions,update_package);
router.get('/edit/:id',check_access_sessions,edit_package);

router2.post('/apply/:id',check_access_sessions,apply_for_Package);
router2.get('/verifyRequest',check_access_sessions,verify_package)
module.exports = router2;