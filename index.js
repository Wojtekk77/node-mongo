const express = require("express");
const patch = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
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
  res.send(`
    <h1>Hello World jup</h1>
    <h4>click here to get access <a href="/student/list">Download</a></h4>
    <form action="/quotes" method="POST">
        <input type="text" placeholder="name" name="name">
        <input type="text" placeholder="quote" name="quote">
        <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/quotes", (req, res) => {
  console.log("Hellooooooooooooooooo!");
});
const mongoConnectionString =
  "mongodb+srv://Wojtek:MongoPass@cluster0.uhmy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to Database");
  })
  .catch((error) => console.error(error));
