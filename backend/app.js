const bodyParser = require("body-parser");
const express = require("express");

const placeRoute = require("./routes/place-route");
const userRoute = require("./routes/user-route");

const app = express();
// app.use("/", bodyParser.json());
app.use("/places", placeRoute);
app.use("/users", userRoute);

app.listen(5000);
