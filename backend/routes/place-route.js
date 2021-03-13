const express = require("express");

const router = express.Router();

const places = [
  {
    id: "pid_1",
    title: "India gate",
    desc: `The India Gate is a war memorial located astride the Rajpath, on the eastern edge of the "ceremonial axis" of New Delhi, formerly called Kingsway.`,
    image:
      "https://cdn.pixabay.com/photo/2020/02/02/17/24/travel-4813658__340.jpg",
    address: "Rajpath, India Gate, New Delhi, Delhi 110001",
    location: {
      long: 77.2295,
      lat: 28.612912,
    },
    author: "uid_2",
  },
  {
    id: "pid_2",
    title: "Taj Mahal",
    desc: `The TAJ MAHAL is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan (reigned from 1628 to 1658) to house the tomb of his favourite wife.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/220px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg",
    address: "Number One, Man Singh Rd, New Delhi, Delhi 110001",
    location: {
      long: 78.0421,
      lat: 27.1751,
    },
    author: "uid_1",
  },
];

router.get("/:pid", (req, res, next) => {
  const pid = req.params.pid;
  const result = places.filter((place) => place.id == pid);
  res.json(result);
});
router.get("/", (req, res, next) => {
  res.json(places);
});

module.exports = router;