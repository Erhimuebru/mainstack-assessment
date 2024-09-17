import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    const savedUser = await user.save();

    const { _id, email: userEmail, createdAt, updatedAt } = savedUser;
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: _id,
        email: userEmail,
        createdAt,
        updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};
