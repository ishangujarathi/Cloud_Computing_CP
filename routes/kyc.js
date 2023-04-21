const express = require("express");
const router = express.Router();
const { uploadToCloudinary } = require("../services/cloudinary");
const Kyc = require("../models/Kyc");
const User = require("../models/User");
const upload = require("../middlewares/upload");

router.post(
  "/",
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "passport", maxCount: 1 },
  ]),
  async (req, res) => {
    const { fullName, email, phone, address } = req.body;
    const aadhaarFile = req.files["aadhaar"] ? req.files["aadhaar"][0] : null;
    const passportFile = req.files["passport"]
      ? req.files["passport"][0]
      : null;

    try {
      //Upload Images to Cloudinary
      const aadhaarData = aadhaarFile
        ? await uploadToCloudinary(aadhaarFile.path, "aadhaar")
        : null;
      const passportData = passportFile
        ? await uploadToCloudinary(passportFile.path, "passport")
        : null;

      //Save Data to the database
      const kyc = new Kyc({
        fullName,
        email,
        phone,
        address,
        aadhaarUrl: aadhaarData ? aadhaarData.url : null,
        aadhaarPublicId: aadhaarData ? aadhaarData.public_id : null,
        passportUrl: passportData ? passportData.url : null,
        passportPublicId: passportData ? passportData.public_id : null,
      });
      await kyc.save();

      res.status(201).send(kyc);
    } catch (error) {
      res.status(400).send(`Error is ${error}`);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const kycs = await Kyc.findOne({ email: email });
    res.status(200).send(kycs);
  } catch (error) {
    res.status(400).send(`Error is ${error}`);
  }
});

router.put("/approve", async (req, res) => {
  try {
    const email = req.body.email;
    const kyc = await User.findOneAndUpdate(
      { email: email },
      { $set: { kycStatus: true } },
      { new: true }
    );
    res.status(200).send(kyc);
  } catch (error) {
    res.status(500).send(`Error is ${error}`);
  }
});

module.exports = router;
