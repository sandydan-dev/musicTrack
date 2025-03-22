const express = require("express");
const router = express.Router();
const rateLimiter = require("../middleware/rateLimit.middleware");
const { createLikedTrack } = require("../controller/like.controller");
const {
  createTrack,
  fetchTracks,
  axiosData,
  axiosGetUserById,
} = require("../controller/musicTrack.controller");


// create tracks
router.post("/tracks", rateLimiter, createTrack);

// get all tracks
router.get("/tracks", rateLimiter, fetchTracks);

router.get("/userId/:userId", rateLimiter, axiosGetUserById);

// axios
router.get("/axios", axiosData);

//todo:  like the track with userId and trackId
router.get("/liked/:userId/track", createLikedTrack);


module.exports = router;
