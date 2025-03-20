const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// modules
const trackRouter = require("./route/trackMusic.router");

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use("/api/v1", trackRouter);



// export server
module.exports = app;
