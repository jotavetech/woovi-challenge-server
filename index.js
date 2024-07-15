const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
