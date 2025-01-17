const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/signup", UserController.CreateSignup);
router.post("/login", UserController.CreateLogin);
router.put("/:id", UserController.EditUser);
router.get("/", UserController.GetLogin);
router.delete("/:id", UserController.DeleteUser);

module.exports = router;
