const mongoose = require('mongoose');

const classEngineSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  subClass:{ type: String, required: true },
   num:{ type: String, required: true },
   year:{ type: String, required: false },
   country:{ type: String, required: true },

   company:{ type: String, required: true },
   axleStructure:{ type: String, required: true },
   powerEngine:{ type: String, required: false },
   powerHp:{ type: Number, required: false },


}, { timestamps: true });

module.exports = mongoose.model('classengines', classEngineSchema);
