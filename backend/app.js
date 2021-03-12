const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  res.send("<h1> It works </h1>");
});

app.listen(5000);
