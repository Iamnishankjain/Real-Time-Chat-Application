import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getMyFriends, getRecommandedUsers } from '../controllers/userController.js';
const router = express.Router();

//apply auth middleware to all routes in this file
router.use(protectRoute);

router.get('/', getRecommandedUsers);
router.get('/friends', getMyFriends);


export default router;