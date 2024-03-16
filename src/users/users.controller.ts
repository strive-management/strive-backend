import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as UserModel from './users.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const SECRET = process.env.SECRET; //"my_secret"

// export const addNewUser = async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     const addNewUser = await UserModel.createUser(data);
//     res.status(200).json({ success: true });
//   } catch (err: any) {
//     console.error(err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

export const registerUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw new Error('Email not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error('Password not strong enough');
    }

    const exist = await prisma.app_users.findUnique({ where: { email } });
    if (exist) {
      throw new Error('email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.app_users.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });

    if (!SECRET) {
      console.error('SECRET is not defined in the environment variable');
      return res.status(500).send('Internal Server Error');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: '3d',
    });
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.status(201).json({ id: user.id, user: user.first_name, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!SECRET) {
    console.error('SECRET is not defined in the environment variable');
    return res.status(500).send('Internal Server Error');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: '3d',
  });
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.json({ token });
};
