const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittenStuffSchema = new Schema({
  item: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  author: { type: Schema.Types.ObjectId, ref: 'KittenJob' },
  title: String,
  //fans: [{ type: Schema.Types.ObjectId, ref: 'KittenJob' }]
});

module.exports = mongoose.model("KittenStuff", kittenStuffSchema);
