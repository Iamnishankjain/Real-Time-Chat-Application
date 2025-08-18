import User from "../models/User";
import jwt from "jsonwebtoken";

export async function signup(req, res,next ) {
  const {fullname, email, password } = req.body;
  try{

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if(password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    } 

    if(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.find({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered, please try another' });
    }

    const idx = math.floor(Math.random() * 100)+1;
    const randomAvtar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullname,
      email,
      password,
      profilePicture: randomAvtar,
    });

    //Create user in Stream


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

export default {
  signup,
  signin,
  logout
};