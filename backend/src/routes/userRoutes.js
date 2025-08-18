import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { acceptFriendRequest, getMyFriends, getRecommandedUsers, sendFriendRequest } from '../controllers/userController.js';
const router = express.Router();

//apply auth middleware to all routes in this file
router.use(protectRoute);

router.get('/', getRecommandedUsers);
router.get('/friends', getMyFriends);

router.post('/friends-request/:id', sendFriendRequest);
router.put('/friends-request/:id/accept', acceptFriendRequest);


export default router;