const { User } = require("../../models");
const { HttpError } = require("../../utils");

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404, "Not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: null,
  });

  res.status(200).json({ code: 200, message: "Verification successful" });
};

module.exports = verifyEmail;
