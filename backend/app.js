const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const placeRoute = require("./routes/place-route");
const userRoute = require("./routes/user-route");
const app = express();

app.use(bodyParser.json());
app.use("/places", placeRoute);
app.use("/users", userRoute);

mongoose
  .connect(
    "mongodb+srv://Aashu:build4mongo@cluster0.wneuf.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.error("Cannot connect :(", err);
  });
