const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

// ✅ CORS (Allow your frontend in production, allow all in dev)
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

// Routes
const userdatarouting = require("./routes/userdata");
app.use("/data", userdatarouting);

const authrouting = require("./routes/auth");
app.use("/auth", authrouting);

const conversationrouting = require("./routes/conversation");
app.use("/conv", conversationrouting);

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ================= SOCKET LOGIC =================

let users = [];
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.emit("me", socket.id);

  socket.on("addUser", (userId) => {
    if (userId) addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    socket.join(room);
    io.to(room).emit("user:joined", { email, id: socket.id });
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("uservideoclose:call", ({ to }) => {
    io.to(to).emit("closevideo:call", { from: socket.id });
  });

  socket.on("uservideoopen:call", ({ to }) => {
    io.to(to).emit("openvideo:call", { from: socket.id });
  });

  socket.on("useraudioclose:call", ({ to }) => {
    io.to(to).emit("closeaudio:call", { from: socket.id });
  });

  socket.on("useraudioopen:call", ({ to }) => {
    io.to(to).emit("openaudio:call", { from: socket.id });
  });

  socket.on("userhangup:call", ({ to }) => {
    io.to(to).emit("hangupcallnow:call", { from: socket.id });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// ✅ IMPORTANT: Use server.listen, NOT app.listen
server.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
