const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../mongoose/mongoose").userModel;
const Place = require("../mongoose/mongoose").placeModel;

const users = [
  {
    id: "uid_1",
    name: "John",
    places: ["pid_2"],
    fav: [],
    userPhoto: "",
  },
  {
    id: "uid_2",
    name: "sonu",
    places: ["pid_1"],
    fav: ["pid_2"],
    userPhoto: "",
  },
];

router.get("/:uid", async (req, res, next) => {
  const uid = req.params.uid;
  const result = await User.find({ _id: uid }, "-password");
  res.json(result[0].toObject({ getters: true }));
});

router.post("/places", async (req, res, next) => {
  const query = req.body.map((e) => mongoose.Types.ObjectId(e));

  const result = await Place.find({ _id: { $in: query } });
  if (result.length == 0) {
    res.status(404);
    res.json({ message: "No places found." });
  } else {
    res.status(200);
    res.json(result.map((place) => place.toObject({ getters: true })));
  }
});
router.get("/", async (req, res, next) => {
  const result = await User.find({}, "-password");
  res.json(result.map((user) => user.toObject({ getters: true })));
});

module.exports = router;
