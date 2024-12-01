const app = require("express")();
const server = require("http").createServer(app);
require("dotenv").config();

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_PATH || "*",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 5000;
// const port = 5000;

io.on("connection", (socket) => {
  console.log("Socket connected:", socket);
  console.log("Socket is active");

  socket.on("chat", (payload) => {
    console.log("Received payload:", payload);
    io.emit("chat", payload);
  });
});

server.listen(port, () => {
  console.log("Server running on http://localhost:5000...");
});
