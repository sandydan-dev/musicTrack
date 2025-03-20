const express = require("express");
const router = express.Router();

const { axiosData } = require("../axios/axios");

const {
  createTrack,
  fetchTracks,
} = require("../controller/musicTrack.controller");

const rateLimiter = require("../middleware/rateLimit.middleware");

// create tracks
router.post("/tracks", rateLimiter, createTrack);

// get all tracks
router.get("/tracks", rateLimiter, fetchTracks);

// axios
router.get("/axios", axiosData);

module.exports = router;
