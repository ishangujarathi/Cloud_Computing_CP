const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    aadhaarUrl: {
      type: String,
      default: "",
    },
    aadhaarPublicId: {
      type: String,
      default: "",
    },
    passportUrl: {
      type: String,
      default: "",
    },
    passportPublicId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Kyc = mongoose.model("kyc", kycSchema);

module.exports = Kyc;
