const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const placeRoute = require("./routes/place-route");
const userRoute = require("./routes/user-route");
const authRoute = require("./routes/auth-route");
const uri = require("./mongoUri");
const app = express();

app.use(bodyParser.json());
app.use("/places", placeRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.error("Cannot connect :(", err);
  });
