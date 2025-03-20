const axios = require("axios");

// if response have no data return no data found

const axiosData = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/data");

    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: response.data,
      });
    }
  } catch (error) {
    if (error.response.status === 403) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error while fetching data",
      error: error.message,
      error: error,
    });
  }
};

module.exports = { axiosData };
