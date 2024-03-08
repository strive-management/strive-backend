import { Request, Response } from 'express';
import * as UserModel from './users.model';

export const addNewUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const addNewUser = await UserModel.createUser(data);
    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
