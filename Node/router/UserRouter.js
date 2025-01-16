const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/signup", UserController.CreateSignup);
router.get("/", UserController.GetSignup);
router.post("/login", UserController.CreateLogin);
router.get("/", UserController.GetLogin);

// router.post ('/',UserController.CreateUser)
// router.get ('/',UserController.GetUser)

module.exports = router;
