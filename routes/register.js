const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");
const bodyParser = require("body-parser");

router.get("/", (req, res) => {
  res.send("Register Here");
});

//Body-Parser
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  //Hash Password
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    mobile: req.body.mobile,
    gender: req.body.gender,
    dob: moment(req.body.dob).format("YYYY-MM-DD"),
    question: req.body.question,
    answer: req.body.answer,
  };
  let newUser = new User(user);
  // console.log(newUser)
  newUser
    .save()
    .then((resp) => {
      res
        .status(200)
        .send({ message: "User Registered Successfully", data: resp });
    })
    .catch((err) => {
      res.status(400).send({ message: "User Registration Failed", data: err });
    });
});

module.exports = router;
