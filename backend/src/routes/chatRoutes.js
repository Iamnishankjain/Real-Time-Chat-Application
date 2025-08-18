import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getStreamToken } from '../controllers/chatController.js';

const router = express.Router();

router.use(protectRoute); // Apply auth middleware to all routes in this file

router.get('/token', getStreamToken);



export default router;