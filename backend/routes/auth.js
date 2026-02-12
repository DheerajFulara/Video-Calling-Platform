
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

/* -------------------- VERIFY TOKEN -------------------- */
router.get("/", authenticateToken, authController.verifyToken);

module.exports = router;