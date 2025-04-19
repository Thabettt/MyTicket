const jwt = require("jsonwebtoken");

// Generalized role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated." });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `Access denied. Required roles: ${roles.join(", ")}` });
    }

    next();
  };
};

module.exports = { authorize };
