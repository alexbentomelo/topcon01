import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', todoRoutes);

// 404 Error handling
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  next(error);
});

// Generic error handling
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db', {

  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
