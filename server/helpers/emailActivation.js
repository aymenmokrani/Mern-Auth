const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const User = require("../model/user");
sgMail.setApiKey(process.env.MAIL_API_KEY);

module.exports.sendActivattion = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { error: "No existing user with this email, please sign up" };
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_ACTIVATION_LINK, {
    expiresIn: "5m",
  });

  const msg = {
    from: "hajakach@gmail.com",
    to: "aymen.algerieno2014@gmail.com",
    subject: "You gotta Activate Yo account",
    html: `
      <h1>Please use the following to activate your account</h1>
      <p>aymenvalley.com/users/activate/${token}</p>
      <hr />
      <p>This email may containe sensetive information</p>
      <p>your sincere "the valley" ;)</p>
  `,
  };

  return sgMail
    .send(msg)
    .then(() => ({ sucess: true, msg: "message was sent successfully" }))
    .catch((error) => {
      throw error.response.body;
    });
};

module.exports.activateAccount = async (token) => {
  try {
    const verification = await jwt.verify(
      token,
      process.env.JWT_ACTIVATION_LINK
    );
    const { id } = jwt.decode(token);
    const user = await User.updateOne(
      { _id: id },
      { $set: { isActivated: true } }
    );
    return { msg: "Account activated successfully" };
  } catch (error) {
    return { error };
  }
};
