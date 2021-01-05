const { check } = require("express-validator");

module.exports.validRegister = [
  check("name", "name field can't be empty").notEmpty(),
  check("email", "please enter a valid email ").notEmpty().isEmail(),
  check("password", "password must be between 4 and 16 caracters")
    .notEmpty()
    .isLength({ min: 4, max: 16 }),
  check("password", "pasword must contain a number").matches(/\d/),
];

module.exports.validLogin = [
  check("email", "please enter a valid email ").notEmpty().isEmail(),
  check("password", "password must be between 4 and 16 caracters")
    .notEmpty()
    .isLength({ min: 4, max: 16 }),
];
