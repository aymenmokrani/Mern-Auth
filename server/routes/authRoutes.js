const router = require("express").Router();
const {
  registerController,
  loginController,
  sendActivationController,
  checkActivtionController,
} = require("../controller/authController");
const User = require("../model/user");

const { validRegister, validLogin } = require("../helpers/valid");

router.post("/sendactivation", sendActivationController);
router.post("/checkactivation", checkActivtionController);

router.post("/login", validLogin, loginController);
router.post("/register", validRegister, registerController);

module.exports = router;
