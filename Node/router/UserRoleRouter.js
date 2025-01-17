const express = require("express");
const router = express.Router();
const jwt = require('../Auth/jwt');
const userRoleController = require("../controllers/UserRoleController");

router.post('/',jwt.authMW,userRoleController.createUserType);
router.get('/',jwt.authMW,userRoleController.getUserTypes);
router.delete('/:id',jwt.authMW,userRoleController.removeUserType);
router.put('/:id',jwt.authMW,userRoleController.updateUserType);

module.exports = router;
