const USERDATA = require("../models/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");


const getAllUsers = async (req, res) => {
    try {
        const data = await USERDATA.find();
        res.json(data);
        console.log("Fetched all users", data);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


const registerUser = async (req, res) => {
    try {
        const { name, phoneno, email, password, category = "general" } = req.body;

        if (!name || !phoneno || !email || !password) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const existingUser = await USERDATA.findOne({
            $or: [{ Phoneno: phoneno }, { Email: email }]
        }).lean();

        if (existingUser) {
            if (existingUser.Phoneno === phoneno) {
                return res.status(409).json({ message: "Phone already exists" });
            }
            if (existingUser.Email === email) {
                return res.status(409).json({ message: "Email already exists" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 4);

        const userdata = new USERDATA({
            Name: name,
            Phoneno: phoneno,
            Email: email,
            Category: category,
            Password: hashedPassword,
        });

        await userdata.save();
        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await USERDATA.findOne({ Email: email })
            .select('Name Phoneno Email Category Password _id')
            .lean();
        if (!user) {
            return res.json({ data: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.json({ data: "Invalid Credentials" });
        }

        const payload = {
            Name: user.Name,
            Phoneno: user.Phoneno,
            Email: user.Email,
            Category: user.Category,
            _id: user._id
        };

        const token = jwt.sign(payload, config.jwtSecret);
        res.send(token);

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

/**
 * Get user by ID
 */
const getUserById = async (req, res) => {
    try {
        const user = await USERDATA.findById(req.body.id).lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(400).json({ message: "Invalid user ID", error: err.message });
    }
};

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    getUserById,
};
