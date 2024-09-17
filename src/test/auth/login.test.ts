import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { login } from '../../controllers/auth';

// Mock bcrypt and User model
jest.mock('bcryptjs');
jest.mock('../../models/user');
jest.mock('jsonwebtoken');

describe('User Login', () => {
  it('should log in a user and return a token', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    } as Request;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    const user = {
      _id: 'userId123',
      email: 'test@example.com',
      password: 'hashedpassword',
    };

    (User.findOne as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('jwt-token');

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login successful',
      token: 'jwt-token',
      user: {
        id: 'userId123',
        email: 'test@example.com',
      },
    });
  });

  it('should return 401 if credentials are invalid', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    } as Request;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    const user = {
      _id: 'userId123',
      email: 'test@example.com',
      password: 'hashedpassword',
    };

    (User.findOne as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should return 500 if there is a server error', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    } as Request;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error logging in' });
  });
});
