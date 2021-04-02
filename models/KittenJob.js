const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittenJob = new Schema({
  jobName: { type: String },
  description: { type: String },
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'KittenStuff' }]
});

module.exports = mongoose.model("KittenJob", kittenJob);
