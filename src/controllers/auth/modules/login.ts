import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
   
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const userData = {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: userData 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};
