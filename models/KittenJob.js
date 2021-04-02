const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittenJob = new Schema({
  _id: { type: Number, unique: true },
  jobName: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("KittenJob", kittenJob);
