const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Place = require("../mongoose/mongoose").placeModel;

router.get("/:pid", async (req, res, next) => {
  const pid = req.params.pid;
  try {
    const result = await Place.find({ _id: pid });
    res.json(result);
  } catch (err) {
    res.status(404);
    res.json({ message: "Invalid Place id", error: err });
  }
});

router.get("/", async (req, res, next) => {
  res.json(await Place.find({}, null, { sort: { date: -1 } }));
});

router.post("/", (req, res, next) => {
  let { title, desc, image, location, address, author, authorPhoto } = req.body;
  let createdPlace = new Place({
    title,
    desc,
    image,
    location,
    address,
    author,
    authorPhoto,
    date: new Date().getTime(),
    love: 0,
  });
  createdPlace.save();

  res.status(201).json({ done: "true" });
});

router.post("/fav", async (req, res, next) => {
  const body = req.body;
  const query = body.map((e) => mongoose.Types.ObjectId(e));
  const result = await Place.find({ _id: { $in: query } });

  if (result.length == 0) {
    res.status(404);
    res.json({ message: "No favorite places.", error: err });
  } else {
    res.status(200);
    res.json(result);
  }
});

module.exports = router;
