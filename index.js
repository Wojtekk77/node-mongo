const express = require("express");
const patch = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(3000, () => {
  console.log("Hello World, server start at port 3000");
});
app.set("view engine", "ejs");
app.use(express.static("public"));

const mongoose = require("mongoose");
const router = express.Router();

const url =
  "mongodb+srv://Wojtek:MongoPass@cluster0.uhmy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

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

const Kitten = mongoose.model("Kitten", kittySchema);

// const silence = new Kitten({ name: "Silence is golden" });
// console.log(silence.name); // 'Silence'
// silence.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });

// const fluffy = new Kitten({ name: "fluffy" });
// fluffy.speak(); // "Meow name is fluffy"

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });
//
// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// });

// Kitten.find({ name: "fluffy" }, console.log("callback if we find them"));

app.get("/kittens", async (request, response) => {
  try {
    const result = await Kitten.find();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/kitten", async (request, response) => {
  try {
    const kitty = new Kitten({ name: "name from post api" });
    const result = await kitty.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/kitten/:id", async (request, response) => {
  try {
    const kitty = await Kitten.findById({ _id: request.params.id });
    kitty.set({ name: "name changed via post method", todo: "via put method" });
    const result = await kitty.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/kitten/:id", async (request, response) => {
  try {
    const result = await Kitten.deleteOne({ _id: request.params.id });
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/kitten/how_many_names", async (request, response) => {
  try {
    const result = await Kitten.aggregate([
      { $match: {} },
      { $group: { _id: "$name", nameCount: { $sum: 2 } } },
    ]);

    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

const kittens_stuff_schema = new mongoose.Schema({
  item: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const Kittens_stuffs = mongoose.model("kittens_stuffs", kittens_stuff_schema);

app.get("/kittens_stuffs", async (request, response) => {
  try {
    const result = await Kittens_stuffs.find({});
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/kittens_stuffs", async (request, response) => {
  try {
    const kitty = new Kittens_stuffs({
      item: request.body.item,
      price: request.body.price,
      quantity: request.body.quantity,
    });
    const result = await kitty.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
