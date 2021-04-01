const express = require("express");
const patch = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const { MongoClient } = require("mongodb");
// const bodyparser = require("body-parser");

var app = express();

//app.use(bodyparser.urlencoded({ extended: true }));
//app.use(bodyparser.json());
//deprecated methods, now we use below
//my// mongo "mongodb+srv://cluster0.uhmy8.mongodb.net/myFirstDatabase" --username Wojtek
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
  console.log("Hello World, server start at port 3000");
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello World jup</h1>
  <h4>click here to get access <a href="/student/list">Download</a></h4>`);
});
