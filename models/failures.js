const mongoose = require("mongoose");

const failuresSchema = new mongoose.Schema(
  {
    main_type: { type: String, required: true },
    failure: { type: String, required: false, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("failures", failuresSchema);
