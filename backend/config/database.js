const mongoose = require("mongoose");
const config = require("./env");

const connectDatabase = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB database connection established successfully.");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

module.exports = connectDatabase;
