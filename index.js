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
});

kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model("Kitten", kittySchema);

const silence = new Kitten({ name: "Silence is golden" });
console.log(silence.name); // 'Silence'
silence.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

const fluffy = new Kitten({ name: "fluffy" });
fluffy.speak(); // "Meow name is fluffy"

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });

// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// });

Kitten.find({ name: "fluffy" }, console.log("callback if we find them"));

app.get("/", async (request, response) => {
    try {
        var result = await Kitten.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
