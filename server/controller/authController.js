const { validationResult } = require("express-validator");
const users = require("../databank/users");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const envs = require("../config/config");
const User = require("../model/user");
const {
  sendActivattion,
  activateAccount,
} = require("../helpers/emailActivation");

sgMail.setApiKey(envs.MAIL_API_KEY);

module.exports.loginController = (req, res) => {
  const errors = validationResult(req);
  // Validate Input Errors
  if (!errors.isEmpty()) {
    errors.array().map((err) => ({
      [err.param]: err.msg,
    }));
    res.status(400).send(errors.errors[0]);
  } else {
    const { email, password } = req.body;

    // check if user exists
    User.findOne({ email }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(400).json({ error: "user with this email doesn't exist" });
      } else {
        // user exists
        // check Password
        if (user.password === password) {
          // correct data
          // check if activated user
          if (user.isActivated) {
            const token = jwt.sign(
              {
                _id: user._id,
              },
              process.env.JWT_ACTIVATION_LINK,
              { expiresIn: "1d" }
            );
            res.json({ token, user, msg: "login sucess" });
          } else {
            res.status(400).json({ error: "Account is not activated" });
          }
        } else {
          res.status(400).json({ error: "password is incorrect" });
        }
      }
    });
  }
};

module.exports.registerController = async (req, res) => {
  const errors = validationResult(req);

  // Validate Input Errors
  if (!errors.isEmpty()) {
    errors.array().map((err) => ({
      [err.param]: err.msg,
    }));
    res.status(400).send(errors.errors[0]);
  } else {
    const { name, email, password } = req.body;

    // Check if User Already Exists
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send({ error: "user already exists" });
    } else {
      // Add the user
      try {
        const response = await User.create({ name, email, password });
        console.log(response);
      } catch (error) {
        res.status(400).json({
          error: "error happened, user wasn't added",
        });
      }

      // Assign token
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACTIVATION_LINK,
        { expiresIn: "5m" }
      );
      res.json({ token });
    }
  }
};

module.exports.sendActivationController = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await sendActivattion(email);
    res.json(response);
  } catch (error) {
    res.json({ error });
  }
};

module.exports.checkActivtionController = async (req, res) => {
  const { token } = req.body;

  try {
    const response = await activateAccount(token);
    res.send(response);
  } catch (error) {
    res.json({ error });
  }
};
