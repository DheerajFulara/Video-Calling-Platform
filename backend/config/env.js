require("dotenv").config();

const validateEnv = () => {
    const required = ["MONGO_URI", "SECRET_OR_KEY", "PORT"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
};

validateEnv();

module.exports = {
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.SECRET_OR_KEY,
    port: process.env.PORT || 4000,
    nodeEnv: process.env.NODE_ENV || "development",
    frontendurl: process.env.FRONTEND_URL,
};
