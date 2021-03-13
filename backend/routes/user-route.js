const express = require("express");

const router = express.Router();

const users = [
  {
    id: "uid_1",
    name: "John",
    places: ["pid_2"],
    userPhoto: "",
  },
  {
    id: "uid_2",
    name: "sonu",
    places: ["pid_1"],
    userPhoto: "",
  },
];

router.get("/:uid", (req, res, next) => {
  const uid = req.params.uid;
  const result = users.filter((user) => user.id == uid);
  res.json(result);
});
router.get("/", (req, res, next) => {
  res.json(users);
});

module.exports = router;
