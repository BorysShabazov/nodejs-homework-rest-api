const { User } = require("../../models");
const { HttpError, createHashPassword, sendEmail } = require("../../utils");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await createHashPassword(password);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });
  const verifyEmail = {
    to: email,
    subject: "Привіт красуне",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationCode}">Click verify email.</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    code: 201,
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = register;
