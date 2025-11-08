require('dotenv').config();


const express = require('express');
const http = require('http');
const cors = require('cors');
const { connectDB } = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');
const socketHandler = require('./socket');
const { Server } = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chatai-jsx1.vercel.app",
    methods: ['GET', 'POST']
  }
});

connectDB();

app.use(cors({
  origin: ["https://chatai-jsx1.vercel.app"],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use('/api/messages', messageRoutes);

socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// https://github.com/jerrin0256/CHATAI.git
// https://github.com/jerrin0256/CHATAI.git