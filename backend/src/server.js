import expreess from 'express';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import { connectDB } from './lib/db.js';

const app = expreess();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => { 
  console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});