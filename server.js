const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

let devicesCollection,
  serverString =
    "mongodb+srv://user123:user123@cluster0.1a9nk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

MongoClient.connect(serverString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("akamai-devices");
    devicesCollection = db.collection("devices");
  })
  .catch((error) => console.error(error));

app.post("/devices", (req, res) => {
  devicesCollection
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.error(error));
});
