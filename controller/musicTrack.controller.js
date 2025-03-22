const track = require("../model/track.model");
const { axiosInstance } = require("../axios/axios");

// create a new track
const createTrack = async (req, res) => {
  try {
    const {
      title,
      artist,
      album,
      genre,
      duration,
      releaseDate,
      lyrics,
      mood,
      format,
    } = req.body;

    const newTrack = await track.create({
      title,
      artist,
      album,
      genre,
      duration,
      releaseDate,
      lyrics,
      mood,
      format,
    });

    if (!newTrack) {
      return res.status(400).json({
        success: false,
        message: "Track not created",
      });
    }

    // save data
    await newTrack.save();

    return res.status(201).json({
      success: true,
      message: "Track created successfully",
      data: newTrack,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while creating track",
      error: error.message,
    });
  }
};

const fetchTracks = async (req, res) => {
  try {
    const tracks = await track.findAll();

    if (tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }

    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({
      message: "Error while getting user data from the database",
      error: error.message,
    });
  }
};

const axiosData = async (req, res) => {
  try {
    const response = await axiosInstance.get("/data");

    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: response.data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching data",
      error: error.message,
      error: error,
    });
  }
};

const axiosGetUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await axiosInstance.get(`/userId/${userId}`);

    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: response.data,
      });
    }
  } catch (error) {
    if (error.response.status === 500) {
      return res.status(500).json({
        success: false,
        message: "Error while fetching data",
        error: error.message,
        error: error,
      });
    }
  }
};

module.exports = {
  createTrack,
  fetchTracks,
  axiosData,
  axiosGetUserById,
};
