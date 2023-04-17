const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TempHashSchema = new Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, expires: "1h" },
  token: { type: String, required: true },
});

const TempHash = mongoose.model("TempHash", TempHashSchema);

module.exports = TempHash;
