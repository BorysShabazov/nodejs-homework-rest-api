const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemaAuth } = require("../../schemas");
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../../controlers/auth");

const router = express.Router();

router.post("/register", validateBody(schemaAuth.registerSchema), register);

router.post("/login", validateBody(schemaAuth.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

// router.get("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
