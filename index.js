const express = require("express");
const patch = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
var app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body

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

const Kitten = require("./models/Kitten");

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

const KittenStuff = require("./models/KittenStuff");

app.get("/kittens_stuffs", async (request, response) => {
  try {
    const result = await KittenStuff.find({});
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/kittens_stuffs", async (request, response) => {
  try {
    console.log(request.body);
    const kitty = new KittenStuff({
      item: request.body.item,
      price: request.body.price,
      quantity: request.body.quantity,
      author: request.body.author,
      title: request.body.title,
      fans: request.body.fans,
    });
    const result = await kitty.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

const KittenJob = require("./models/KittenJob");

app.get("/kitten_job", async (request, response) => {
  try {
    const result = await KittenJob.find({});
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/kitten_job", async (request, response) => {
  try {
    console.log(request.body);
    const kitty = new KittenJob({
      jobName: request.body.jobName,
      description: request.body.description,
      name: request.body.name,
      ages: request.body.ages,
      stories: request.body.stories,
    });
    const result = await kitty.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/kitten_lookup", async (request, response) => {
  try {
    //KittenJob nalezy do kolekcji kittenjobs
    const result = await KittenJob.aggregate([
      {
        $lookup: {
          from: "kittenstuffs",
          localField: "jobName",
          foreignField: "item",
          as: "myJoinedFields",
        },
      },
    ]);
    response.send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});
