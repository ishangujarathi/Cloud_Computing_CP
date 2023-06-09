const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const moment = require("moment");

const router = express.Router();
//Body-Parser
const jsonParser = bodyParser.json();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let role, name, bookings;
    const doc = await User.findOne({ email: email });
    role = doc?.role;
    name = doc?.name;
    kycStatus = doc?.kycStatus;
    bookings = doc?.bookings;
    console.log(doc);
    if (!doc) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = await bcrypt.compare(password, doc.password);
    if (response) {
      const token = jwt.sign({ doc }, "top_secret");
      return res
        .status(200)
        .json({ token, role, email, name, bookings, kycStatus });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/bookings", async (req, res) => {
  try {
    const email = req.query.email;

    const result = await User.findOne({ email: email });
    const bookings = result.bookings;
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error });
  }
});

router.put("/bookings", async (req, res) => {
  const email = req.query.email;
  User.findOneAndUpdate(
    { email: email },
    { $inc: { bookings: 1 } },
    { new: true }
  )
    .then((resp) => {
      res.status(200).json({ message: "Bookings Updated", resp });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error in Updating Bookings", error: err.message });
    });
});

router.get("/users/kyc", async (req, res) => {
  try {
    const result = await User.find({ kycStatus: false });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error });
  }
});

router.get("/question", async (req, res) => {
  try {
    const { email } = req.query;
    let question;
    const result = await User.findOne({ email: email });
    question = result.question;
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error });
  }
});

router.get("/answer", async (req, res) => {
  try {
    const { answer, email } = req.query;
    const resp = await User.findOne({ email: email });
    const docAnswer = resp.answer;
    const response = docAnswer === answer ? true : false;
    res.status(200).json({ response });
  } catch (error) {}
});

router.put("/reset", jsonParser, async (req, res) => {
  const { password, email } = req.query;
  //Hash Password
  const hashPassword = await bcrypt.hash(password, 10);
  const query = { email: email };
  const update = { $set: { password: hashPassword } };
  const options = { new: true };

  await User.findOneAndUpdate(query, update, options)
    .then((updatedDoc) => {
      res.status(200).json({ message: "Password Updated" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error in Password Updation", error: err });
    });
});

module.exports = router;
