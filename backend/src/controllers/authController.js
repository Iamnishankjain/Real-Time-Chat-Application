import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res,next ) {
  const {fullName, email, password } = req.body;
  try{

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if(password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    } 

    if(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered, please try another' });
    }

    const idx = Math.floor(Math.random() * 100)+1;
    const randomAvtar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePicture: randomAvtar,
    });

    //Create user in Stream
    try{
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePicture || ""
      });
      console.log('Stream user created for ', newUser.fullName);
    }catch (error) {
      console.error('Error creating Stream user:', error);
    }


    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});  

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,   //prevents XSS attacks
      sameSite: 'strict', // prevents CSRF attacks
      secure: process.env.NODE_ENV === 'production' // use secure cookies in production
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser
    });


  }catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

export async function login(req, res, next) {
  const { email, password } = req.body;
  try{
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'invalid email or password' });
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user
    });

  }catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export function logout(req, res, next) {
  res.clearCookie('jwt');
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
}

export async function onboard(req, res, next) {
  try{
    const userId = req.user._id;
    const {fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
    if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
         message: 'All fields are required',
         missingFields:[
          !fullName && 'fullName',
          !bio && 'bio', 
          !nativeLanguage && 'nativeLanguage',
          !learningLanguage && 'learningLanguage',
          !location && 'location'
         ],
        });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...req.body,
      isOnboarded: true
    },{ new: true});

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    //Update user in Stream
    try{
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePicture || "",
      });
      console.log('Stream user updated for ', updatedUser.fullName);
    }catch (error) {
      console.error('Error updating Stream user:', error);
    }


    res.status(200).json({
      success: true,
      message: 'Onboarding successful',
      user: updatedUser
    });

  }catch (error) {
    console.error('Error during onboarding:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default {
  signup,
  login,
  logout,
  onboard
};