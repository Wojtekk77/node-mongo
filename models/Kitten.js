const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kittySchema = new mongoose.Schema({
    name: { type: String, unique: true },
    todo: { type: String },
  });
  
  kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  module.exports = mongoose.model("Kitten", kittySchema);