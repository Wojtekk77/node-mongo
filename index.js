const express = require("express");
const patch = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
const Character = require("./models/Character");

async function runCode() {
  //   const ken = new Character({
  //     name: "Ken",
  //     quote: "Guren Enjinkyaku",
  //   });

  //   const doc2 = await ken.save();

  // <-lets find one by name->
  //   const yoda = await Character.findOne({ name: "Yoda" });
  //   console.log(yoda);

  // const ryu = await Character.find({ name: 'Yoda' })
  // console.log(ryu)

  // const chars = await Character.find()
  // console.log(chars)

  const ryu = await Character.findOne({ name: "Yoda" });
  ryu.specials = ["Hadoken", "Shoryuken", "Tatsumaki Senpukyaku"];

  const doc = await ryu.save();
  console.log(doc);
}

runCode().catch((error) => {
  console.error(error);
});

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

const mongoose = require("mongoose");
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

// const mongoConnectionString =
//   "mongodb+srv://Wojtek:MongoPass@cluster0.uhmy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const MongoClient = require("mongodb").MongoClient;
// MongoClient.connect(mongoConnectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then((client) => {
//     console.log("Connected to Database");
//     const db = client.db("star-wars-quotes");
//     const quotesCollection = db.collection("quotes");
//     // app.use(/* ... */);
//     app.get("/", async (req, res) => {
//       const results = await db.collection("quotes").find().toArray();

//       res.render("index.ejs", { quotes: results });
//     });

//     app.post("/quotes", (req, res) => {
//       quotesCollection
//         .insertOne(req.body)
//         .then((result) => {
//           console.log(result);
//           res.redirect("/");
//         })
//         .catch((error) => console.error(error));
//     });

//     app.put("/quotes", (req, res) => {
//       quotesCollection
//         .findOneAndUpdate(
//           { name: "yoda" },
//           {
//             $set: {
//               name: req.body.name,
//               quote: req.body.quote,
//             },
//           },
//           {
//             upsert: true,
//           }
//         )
//         .then((result) => {
//           res.json("Success");
//         })
//         .catch((error) => console.error(error));
//     });

//     app.delete("/quotes", (req, res) => {
//       quotesCollection
//         .deleteOne({ name: req.body.name })
//         .then((result) => {
//           if (result.deletedCount === 0) {
//             return res.json("No quote to delete");
//           }
//           res.json(`Deleted Darth Vadar's quote`);
//         })
//         .catch((error) => console.error(error));
//     });

//     // app.listen(/* ... */);
//   })
//   .catch((error) => console.error(error));
