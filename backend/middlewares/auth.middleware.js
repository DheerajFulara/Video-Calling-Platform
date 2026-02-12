const jwt = require("jsonwebtoken");
const config = require("../config/env");

/**
 * Middleware to verify JWT token from Authorization header
 * Attaches decoded user data to req.user if token is valid
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
