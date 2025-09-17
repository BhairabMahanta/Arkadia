import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { tournamentDB } from './database/tournaments';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : false,
    methods: ['GET', 'POST', 'PUT']
  }
});

const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Tournament Routes
app.get('/api/tournaments', (req, res) => {
  const tournaments = tournamentDB.getAllTournaments();
  res.json({ tournaments });
});

app.post('/api/tournaments', (req, res) => {
  const { name, description, organizerId, guildId, maxParticipants } = req.body;
  
  if (!name || !organizerId) {
    return res.status(400).json({ error: 'Name and organizerId are required' });
  }

  try {
    const tournament = tournamentDB.createTournament({
      name,
      description,
      organizerId,
      guildId,
      maxParticipants,
      status: 'upcoming'
    });

    // Broadcast to connected clients
    io.emit('tournament_created', tournament);

    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tournament' });
  }
});

app.post('/api/tournaments/:id/join', (req, res) => {
  const { id } = req.params;
  const { userId, username } = req.body;

  if (!userId || !username) {
    return res.status(400).json({ error: 'UserId and username are required' });
  }

  const success = tournamentDB.joinTournament(id, { userId, username, isActive: true });
  
  if (success) {
    const tournament = tournamentDB.getTournament(id);
    io.emit('tournament_updated', tournament);
    res.json({ message: 'Successfully joined tournament', tournament });
  } else {
    res.status(400).json({ error: 'Failed to join tournament' });
  }
});

app.get('/api/tournaments/:id', (req, res) => {
  try {
    const tournament = tournamentDB.getTournament(req.params.id);

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    res.json(tournament);
  } catch (error) {
    console.error("Error fetching tournament:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-tournament', (tournamentId) => {
    socket.join(`tournament-${tournamentId}`);
    console.log(`Socket ${socket.id} joined tournament ${tournamentId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});

export { io };
