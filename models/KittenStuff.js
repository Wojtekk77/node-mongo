const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittenStuffSchema = new Schema({
    _id: {type:Number},
    item: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  });

  module.exports = mongoose.model("KittenStuff", kittenStuffSchema);