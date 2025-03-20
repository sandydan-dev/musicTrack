const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =  req.headers.authorization && req.headers.authorization.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(403).json({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    req.user = decoded; // Attach the user information to the request object
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next(); // Proceed to the next middleware or route handler
};

module.exports = verifyToken;
