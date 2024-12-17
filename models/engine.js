const mongoose = require('mongoose');

const engineSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subClass:{ type: String, required: true , unique: true},
   num:{ type: String, required: true },
   year:{ type: String, required: false },
   country:{ type: String, required: false },

   company:{ type: String, required: true },
   axleStructure:{ type: String, required: true },
   powerEngine:{ type: String, required: false },
   powerHp:{ type: String, required: false },
   specs:{ type: String, required: false },
   
   condition:{ type: String, required: true },
   
}, { timestamps: true });

module.exports = mongoose.model('Engine', engineSchema);
