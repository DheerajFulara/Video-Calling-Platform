const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            required: true,
            index: true,
        },
        senderEmail: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient message retrieval by room
messageSchema.index({ room: 1, timestamp: -1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
