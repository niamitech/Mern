require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // You can restrict this to your frontend URL
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Rate limiter config (optional, but keep if you want)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  }
});

app.use('/api', apiLimiter);

// Pass io instance to routes so they can emit events
app.use('/api', (req, res, next) => {
  req.io = io;
  next();
}, apiRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
