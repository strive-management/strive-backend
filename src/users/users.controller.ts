import { Request, Response } from 'express';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

import { createUser, findUserByEmail } from './users.model';

import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET; //"my_secret"

function createSessionToken(user: {
  id: any;
  email: any;
  first_name?: string;
  last_name?: string;
  password?: string | null;
  UUID?: string | null;
  employee_id?: number | null;
}) {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  const options = { expiresIn: '24h' };

  if (typeof SECRET === 'undefined') {
    throw new Error('SECRET_KEY is not defined');
  }

  const token = jwt.sign(payload, SECRET, options);

  return token;
}

export const registerUser = async (req: Request, res: Response) => {
  const { token, email, first_name, last_name } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken || decodedToken.email !== email) {
      return res.status(401).json({ error: 'Unauthorized access.' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const newUser = await createUser({
      email,
      first_name: first_name,
      last_name: last_name,
      UUID: decodedToken.uid,
    });

    const sessionToken = createSessionToken(newUser);
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const sessionToken = createSessionToken(user);
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie('sessionToken', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ error: 'Internal server error during logout' });
  }
};
