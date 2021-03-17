const express = require("express");
const router = express.Router();

const Place = require("../mongoose/mongoose").placeModel;
const User = require("../mongoose/mongoose").userModel;

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
  res.json(await Place.find({}, null, { sort: { date: 1 } }));
});

router.post("/", (req, res, noxt) => {
  let { title, desc, image, location, address, author } = req.body;
  let createdPlace = new Place({
    title,
    desc,
    image,
    location,
    address,
    author,
    date: new Date().getMilliseconds(),
    love: 0,
  });
  createdPlace.save().then(async (res) => {
    let id = res._id;
    const user = await User.findOne({ _id: author });
    user.places.push(id);
    user.save();
  });

  res.status(201).json({ done: "true" });
});

module.exports = router;
