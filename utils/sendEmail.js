const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "borya2569@gmail.com",
    pass: EMAIL_PASS,
  },
});

async function sendEmail(data) {
  await transporter.sendMail({
    ...data,
    from: "borya2569@gmail.com",
  });
  console.log("Повідомлення відправлене");
}

module.exports = sendEmail;
