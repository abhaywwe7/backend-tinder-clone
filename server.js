import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";
//app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:6wC7RjUJ0Rwpwj8N@cluster0.h1cqt.mongodb.net/tinderdb?retryWrites=true&w=majority`;
//middlewares
app.use(express.json());
app.use(Cors());
// db config
mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

//api endpoints
app.get("/", (req, res) => res.status(200).send("Hello abhay bhoi!"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listner
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
