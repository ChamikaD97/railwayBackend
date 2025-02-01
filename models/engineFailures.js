const mongoose = require("mongoose");

const engineFailuresSchema = new mongoose.Schema(
  {
    date: { type: Date, required: false },
    failure: { type: String, required: true },
    drivcerComNum: { type: String, required: true },
    engine: { type: String, required: true },
    trainNumber: { type: String, required: true },
    comments: { type: String, require: false },
    risk: { type: String, require: false },
    status: { type: String, require: false },
    LFCComNum: { type: String, required: false },
    assingedTo: { type: String, require: false },
    startedOn: { type: Date, required: false },
    completedOn: { type: Date, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("engineFailures", engineFailuresSchema);
