import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { connectDB } from './lib/db.js';



const app = express();
app.use(cors(
  {
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }
));
const PORT = process.env.PORT;

const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

app.listen(PORT, () => { 
  console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});