const express = require("express");
const patch = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");

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

app.set("view engine", "ejs");
app.use(express.static("public"));

const mongoConnectionString =
  "mongodb+srv://Wojtek:MongoPass@cluster0.uhmy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");
    // app.use(/* ... */);
    app.get("/", async (req, res) => {
      const results = await db.collection("quotes").find().toArray();

      res.render("index.ejs", { quotes: results });
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: "yoda" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    // app.listen(/* ... */);
  })
  .catch((error) => console.error(error));
