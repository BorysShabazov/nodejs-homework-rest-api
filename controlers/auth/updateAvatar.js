const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  Jimp.read(resultUpload)
    .then((image) => {
      image.resize(250, 250).write(resultUpload);
    })
    .catch((err) => {
      console.log(err);
    });

  const avaterURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avaterURL });

  res.status(200).json({ avaterURL });
};

module.exports = updateAvatar;
