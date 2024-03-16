import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized: Missing token' });
  }
  if (!SECRET) {
    console.error('SECRET is not defined in the environment variable');
    return res.status(500).send('Internal Server Error');
  }

  jwt.verify(token, SECRET, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
