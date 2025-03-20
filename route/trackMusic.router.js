const express = require("express");
const router = express.Router();
const axioss = require("axios");

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
const token = process.env.JWT_SECRET_KEY;
router.get("/axios", async (req, res) => {
  try {
    const response = await axioss.get("http://localhost:5000/api/user/data");
    res.json(response.data);
  } catch (error) {
    // if status code 401
    if (error.response.status === 401) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: error.message,
      });
    }
    // if status code 500
    if (error.response.status === 500) {
      return res.status(400).json({
        success: false,
        message: "server error, while fetching data",
        error: error.message,
      });
    }

    // if status code 403 which is forbidden
    if (error.response.status === 403) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        error: error.message,
      });
    }
  }
});

module.exports = router;
