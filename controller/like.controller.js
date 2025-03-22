const like = require("../model/likeTrack.model");
const { axiosInstance } = require("../axios/axios");
const track = require("../model/track.model");

// create liked track by user id

// const createLikedTrack = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const trackId = req.query.trackId;

//     console.log("userID : ", userId);
//     console.log("trackId : ", trackId);

//     if (!userId) {
//       return res.status(400).json({ message: "user id not found" });
//     }

//     if (!trackId) {
//       return res.status(400).json({ message: "track id not found" });
//     }

//     const userDataId = await axiosInstance.get(`/userId/${userId}`);

//     const mongoUserId = userDataId.data.data.id;

//     if (!mongoUserId) {
//       return res
//         .status(404)
//         .json({ message: "mongoUserId, add valid user id" });
//     }

//     // return error if trackid is not found
//     const trackDataId = await track.findOne({
//       where: {
//         id: trackId,
//       },
//     });
//     if (!trackDataId) {
//       return res.status(400).json({ message: "trackId, add valid track id" });
//     }

//     const existingLiked = await like.findOne({
//       where: {
//         userId: mongoUserId,
//         trackId: trackId,
//       },
//     });

//     if (existingLiked) {
//       return res.status(400).json({ message: "user already liked track" });
//     }

//     const newLiked = await like.create({
//       userId: mongoUserId,
//       trackId: trackId,
//     });

//     return res.status(201).json({
//       message: "User liked successfully",
//       newLiked,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "error while creating liked data" });
//   }
// };

// const likeTrackByUserId = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const trackId = req.query.trackId;

//     console.log("userID : ", userId);
//     console.log("trackId : ", trackId);

//     if (!userId) {
//       return res.statu(400).json({
//         message: "userId required",
//       });
//     }

//     // if (!trackId) {
//     //   return res.statu(400).json({
//     //     message: "userId required",
//     //   });
//     // }

//     // if trackId is not found
//     const trackDataId = await track.findOne({
//       where: {
//         id: trackId,
//       },
//     });

//     if (!trackDataId) {
//       return res.status(400).json({
//         message: "trackId not found",
//       });
//     }
//     const userData = await axiosInstance.get(`/userId/${userId}`);

//     const mongoUserId = userData.data.data.id;

//     if (!mongoUserId) {
//       return res.status(404).json({ message: "userID not found" });
//     }

//     // find existing user
//     const existingUser = await like.findOne({
//       where: {
//         userId: mongoUserId,
//         trackId: trackId,
//       },
//     });

//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "user already exists, and already liked track" });
//     }

//     const newLike = await like.create({
//       userId: mongoUserId,
//       trackId: trackId,
//     });

//     return res.status(201).json({ message: "user liked tracks", newLike });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error while creating like",
//       error: error.message,
//     });
//   }
// };

const createLikedTrack = async (req, res) => {
  try {
    const userId = req.params.userId;
    const trackId = req.query.trackId;

    console.log("userID : ", userId);
    console.log("trackId : ", trackId);

    if (!userId) {
      return res.status(400).json({ message: "user id not found" });
    }

    // find trackId is not found
    const trackDataId = await track.findOne({
      where: {
        id: trackId,
      },
    });

    if (!trackDataId) {
      return res.status(400).json({ message: "trackId, add valid track id" });
    }

    const userDataId = await axiosInstance.get(`/userId/${userId}`);

    const authUserId = userDataId.data.data.id;

    if (!authUserId) {
      return res
        .status(404)
        .json({ message: "Auth userId, add valid user id" });
    }

    // find existing user is already liked the track
    const existingLikedTracks = await like.findOne({
      where: {
        userId: authUserId,
        trackId: trackId,
      },
    });

    if (existingLikedTracks) {
      return res.status(400).json({ message: "user already liked track" });
    }

    // create new liked data
    const newLikedTrack = await like.create({
      userId: authUserId,
      trackId: trackId,
    });

    return res.status(201).json({
      message: "User liked successfully",
      newLikedTrack,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "error while creating liked data",
        error: error.message,
      });
  }
};

module.exports = { createLikedTrack };
