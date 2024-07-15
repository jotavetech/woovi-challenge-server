const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");

const path = require("path");

require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = createServer(app);

app.use(express.static(path.join(__dirname, "public")));

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/payment/:id", (req, res) => {
  const { id } = req.params;

  io.emit("payment-success", id);

  res.sendFile(path.join(__dirname, "payment.html"));
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
