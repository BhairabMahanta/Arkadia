import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { tournamentDB } from './database/tournaments';
import { UserDatabase } from './database/users';

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
const userDB = new UserDatabase();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    const user = await userDB.createUser({ email, password, username });
    const sanitizedUser = userDB.sanitizeUser(user);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: sanitizedUser,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Signup failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = userDB.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await userDB.validatePassword(user, password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const sanitizedUser = userDB.sanitizeUser(user);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      user: sanitizedUser,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware to verify JWT
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.get('/auth/me', authenticateToken, (req, res) => {
  const user = userDB.getUserById((req as any).user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const sanitizedUser = userDB.sanitizeUser(user);
  res.json({ user: sanitizedUser });
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
