/**
 * Verify JWT token and return user data
 */
const verifyToken = (req, res) => {
    // User data is already attached by authenticateToken middleware
    res.status(200).json(req.user);
};

module.exports = {
    verifyToken,
};
