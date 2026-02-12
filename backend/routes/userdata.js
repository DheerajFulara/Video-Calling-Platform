

const router = require("express").Router();
const userController = require("../controllers/user.controller");

/* -------------------- GET ALL USERS -------------------- */
router.get("/", userController.getAllUsers);

/* -------------------- REGISTER -------------------- */
router.post("/registeradd", userController.registerUser);

/* -------------------- LOGIN -------------------- */
router.post("/logincheck", userController.loginUser);

/* -------------------- GET USER BY ID -------------------- */
router.post("/getuserdata", userController.getUserById);

module.exports = router;
