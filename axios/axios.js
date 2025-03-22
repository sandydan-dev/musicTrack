const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/user",
  headers: {
    "Accept": "application/json",
    "constent-type": "application/json",
  },
});

module.exports = { axiosInstance };
