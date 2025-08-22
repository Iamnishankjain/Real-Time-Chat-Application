import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";


export async function getRecommandedUsers(req,res){
  try {
    const currentUserId = req.user.id;
    const currentUser= req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude current user
        {_id: {$nin: currentUser.friends}}, // Exclude friends
        { isOnboarded: true } // Only include onboarded users
      ]
    });
    res.status(200).json(recommendedUsers);

  }catch (error) {
    console.error('Error fetching recommended users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export async function getMyFriends(req, res) {
  try{
    const user = await User.findById(req.user.id).select('friends').populate('friends','fullName profilePicture nativeLanguage learningLanguage');

    res.status(200).json(user.friends);
  }catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function sendFriendRequest(req, res) {
  try{
    const myId = req.user.id;
    const {id: reciepientId} = req.params;

    // Check if recipientId is provided
    if (!reciepientId) {
      return res.status(400).json({ message: 'Recipient ID is required' });
    }
    //prevent sending friend request to self
    if (myId === reciepientId) {
      return res.status(400).json({ message: 'You cannot send a friend request to yourself' });
    }

    const recipient = await User.findById(reciepientId);
    // Check if recipient exists
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Check if recipient is already a friend
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: 'You are already friends with this user' });
    }

    // Check if recipient has already sent a friend request
    const isFriendRequestSent = await FriendRequest.findOne({
      $or: [
        { sender: myId, receiver: reciepientId },
        { sender: reciepientId, receiver: myId }
      ],
    });

    if (isFriendRequestSent) {
      return res.status(400).json({ message: 'you have already sent a friend request to this user' });
    }

    // Create a new friend request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      receiver: reciepientId,
    });

    res.status(201).json(friendRequest);

  }catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export async function acceptFriendRequest(req, res) {
  try{
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // Check if the current user is the recipient of the friend request
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to accept this friend request' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    // Add each other to friends list 
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender }
    });

    res.status(200).json({ message: 'Friend request accepted successfully' });


  }catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getFriendRequest(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({ recipient: req.user.id, status: 'pending' }).populate('sender', 'fullName profilePicture nativeLanguage learningLanguage');

    const acceptedReqs = await FriendRequest.find({ sender: req.user.id, status: 'accepted' }).populate('receiver', 'fullName profilePicture');

    res.status(200).json({
      incomingReqs,
      acceptedReqs
    });

  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
       sender: req.user.id, status: 'pending' 
      }).populate('receiver', 'fullName profilePicture nativeLanguage learningLanguage');
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error('Error fetching outgoing friend requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default {
  getRecommandedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequest,
  getOutgoingFriendReqs
}