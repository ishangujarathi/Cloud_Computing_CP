// import required modules
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const TempHash = require("../models/TempHash");
const User = require("../models/User");

// create model for temporary password hashes
const TempHash = mongoose.model("TempHash", TempHashSchema);

// define forgot-password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // generate and store hash in database
  const hash = crypto.randomBytes(20).toString("hex");
  const token = crypto.randomBytes(20).toString("hex");
  const tempHash = new TempHash({ email, hash, token });
  await tempHash.save();

  // send email to user with reset link
  const resetLink = `https://localhost:5173/reset-password?token=${token}&hash=${hash}`;

  sendResetEmail(email, resetLink);

  // send response to client
  res.json({ success: true });
});

// define reset-password route
router.post("/reset-password", async (req, res) => {
  const { token, hash, password } = req.body;

  // check if token and hash are valid
  const tempHash = await TempHash.findOneAndDelete({ token, hash });
  if (!tempHash) {
    return res.status(400).json({ error: "Invalid token or hash" });
  }

  // update user's password in database
  const { email } = tempHash;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  user.password = password;
  await user.save();

  // send response to client
  res.json({ success: true });
});

// send reset email function
function sendResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "example@gmail.com",
      pass: "password",
    },
  });

  const mailOptions = {
    from: "example@gmail.com",
    to: email,
    subject: "Reset Password",
    text: `Click on this link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// export router object
module.exports = router;
