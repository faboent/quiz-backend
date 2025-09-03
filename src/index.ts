import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { questionsRouter } from './routes/questions';
import { quizRouter } from './routes/quiz';
import { testRouter } from './routes/test';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: [
    'https://quiz-frontend-t6vn.vercel.app',  // Your frontend URL
    'http://localhost:5173'  // Local development URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api', testRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});