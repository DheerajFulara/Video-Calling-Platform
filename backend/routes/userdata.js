// const router = require("express").Router();
// const USERDATA = require("../models/userschema");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// /* -------------------- GET ALL USERS -------------------- */
// router.get("/", async (req, res) => {
//   try {
//     const data = await USERDATA.find();
//     res.json(data);
//     console.log("in the route", data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// /* -------------------- REGISTER USER -------------------- */

// router.post("/registeradd", async (req, res) => {
//   try {
//     const { name, phoneno, email, password, category = "general" } = req.body;

//     if (!name || !phoneno || !email || !password) {
//       return res.status(400).json({ message: "All required fields must be provided" });
//     }

//     const phoneExists = await USERDATA.findOne({ Phoneno: phoneno });
//     if (phoneExists) return res.status(409).json({ message: "Phone already exists" });

//     const emailExists = await USERDATA.findOne({ Email: email });
//     if (emailExists) return res.status(409).json({ message: "Email already exists" });

//     const userdata = new USERDATA({
//       Name: name,
//       Phoneno: phoneno,
//       Email: email,
//       Category: category,
//       Password: bcrypt.hashSync(password, 10),
//       Friendslist: []
//     });

//     await userdata.save();
//     return res.status(201).json({ message: "User registered successfully" });

//   } catch (err) {
//     console.error("Register error:", err);
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });


// /* -------------------- LOGIN -------------------- */
// router.post("/logincheck", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await USERDATA.findOne({ Email: email });
//     if (!user) {
//       return res.json({ data: "Invalid Credentials" });
//     }

//     const isMatch = bcrypt.compareSync(password, user.Password);
//     if (!isMatch) {
//       return res.json({ data: "Invalid Credentials" });
//     }

//     const payload = {
//       Name: user.Name,
//       Phoneno: user.Phoneno,
//       Email: user.Email,
//       Category: user.Category,
//       Password: user.Password,
//       Friendslist: user.Friendslist,
//       _id: user._id
//     };

//     const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
//     res.send(token);

//   } catch (err) {
//     console.log("login error", err);
//     res.status(500).json(err);
//   }
// });

// /* -------------------- GET USER BY ID -------------------- */
// router.post("/getuserdata", async (req, res) => {
//   try {
//     const docs = await USERDATA.find({ _id: req.body.id });
//     res.status(200).json(docs);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// module.exports = router;


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
