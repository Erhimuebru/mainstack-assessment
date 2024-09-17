import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/user';
import { register } from '../../controllers/auth';

// Mock bcrypt and User model
jest.mock('bcryptjs');
jest.mock('../../models/user');

describe('User Registration', () => {
  
  it('should register a new user', async () => {
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
  
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    (User as jest.Mocked<any>).mockReturnValue({
      save: jest.fn().mockResolvedValue({
        _id: 'userId123',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    });
  
    await register(req, res);
  
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: {
        id: 'userId123',
        email: 'test@example.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    });
  });
  

  it('should return 400 if email or password is missing', async () => {
    const req = {
      body: {
        email: '',
        password: '',
      },
    } as Request;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as Response;

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
  });


  it('should return 409 if email already exists', async () => {
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

    (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email already exist' });
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

    (User as jest.Mocked<any>).mockImplementation(() => {
      throw new Error('Database error');
    });

    await register(req, res);
  });

  it('should hash the password before saving the user', async () => {
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

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    (User as jest.Mocked<any>).mockReturnValue({
      save: jest.fn().mockResolvedValue(true),
    });

    await register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
  });
});
