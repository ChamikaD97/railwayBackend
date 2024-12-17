const mongoose = require("mongoose");

const engineFailuresSchema = new mongoose.Schema(
  {
    date: { type: Date, required: false },
    failure: { type: String, required: true },
    comNum: { type: String, required: true },
    engine: { type: String, required: true },
    comments: { type: String, require: false },
    risk: { type: String, require: false },
    status: { type: String, require: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("engineFailures", engineFailuresSchema);
