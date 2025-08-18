import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getRecommandedUsers, sendFriendRequest } from '../controllers/userController.js';
const router = express.Router();

//apply auth middleware to all routes in this file
router.use(protectRoute);

router.get('/', getRecommandedUsers);
router.get('/friends', getMyFriends);

router.post('/friends-request/:id', sendFriendRequest);
router.put('/friends-request/:id/accept', acceptFriendRequest);
router.get('/friends-request', getFriendRequest);
router.get("/outgoing-friend-requests",getOutgoingFriendReqs);

export default router;