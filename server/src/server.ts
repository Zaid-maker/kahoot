import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import { setupSocketEvents } from './socketEvents';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Adjust for production
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('QUIZLY API is running!');
});

// Initialize socket handlers
setupSocketEvents(io);

httpServer.listen(PORT, () => {
    console.log(`🚀 QUIZLY Server running on port ${PORT}`);
});