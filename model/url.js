const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    require: true,
  },
  expireAt: { type: Date, },
  
});
urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
// urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model("Url", urlSchema);
