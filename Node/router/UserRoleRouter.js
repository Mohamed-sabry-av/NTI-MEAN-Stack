const express = require("express");
const router = express.Router();
const jwt = require('../Auth/jwt');
const userRoleController = require("../controllers/UserRoleController");

router.post('/',jwt.authMW,userRoleController.createUserType);
router.get('/',jwt.authMW,userRoleController.getUserTypes);
module.exports = router;
