const { User } = require("../../models");
const { sendEmail } = require("../../utils");

const resendVerifyEmail = async (req, res) => {
  if (!req.body.email) {
    throw HttpError(400, "missing required field email");
  }
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationCode}">Click verify email.</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(200).json({
    code: 200,
    message: "Verify email send success",
  });
};

module.exports = resendVerifyEmail;
