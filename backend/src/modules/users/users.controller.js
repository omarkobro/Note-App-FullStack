import User from '../../../DB/models/user.model.js';
import Note from '../../../DB/models/note.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/appErr.js';

export const signup = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email is already in use', 409));
  }

  
  // Hash password
  const hashedPassword = await bcryptjs.hash(password, parseInt(process.env.SALT_ROUNDS));

  // Create user
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  // Return success response
  return res.status(201).json({
    message: 'User created successfully',
    user: {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    },
  });
};

// Login API 
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  // 2. Compare passwords
  const isPasswordMatch = await bcryptjs.compare(password, user.password);
  if (!isPasswordMatch) {
    return next(new AppError('Invalid email or password', 401));
  }

  // 3. Generate JWT
  const token = jwt.sign(
    { user_id: user._id }, 
    process.env.LOGIN_SECRET,
    { expiresIn: '1d' }
  );

  return res.status(200).json({
    message: 'Login successful',
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
    token
  });
};

//========== Get User's Profile ============
export const getUserProfile = async (req, res, next) => {
  const userId = req.authUser._id;

  const user = await User.findById(userId).select('-password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  return res.status(200).json({
    message: 'User profile retrieved successfully',
    user,
  });
};