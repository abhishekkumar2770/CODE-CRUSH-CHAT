// const jwt = require("jsonwebtoken");

// const verifyToken = async (req, res, next) => {
//   const headers = req.headers["authorization"];
//   console.log("Headers from authorization", headers)
//   const token = headers && headers.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ success: false, message: "Access denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.id = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {verifyToken}
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    console.log("Headers from authorization", headers);

    // No header or bad format
    if (!headers || !headers.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = headers.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.id;
    next();
  } catch (error) {
    // Use 401 for token issues, not 500
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    console.error("Unexpected error verifying token:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { verifyToken };
