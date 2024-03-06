import { Request, Response } from 'express';
import * as DepartmentModel from './deparments.model';
import axios from 'axios';
import e from 'cors';

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await DepartmentModel.getDepartments();
    res.status(200).json(departments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};

export const getSingleDepartment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ message: 'Invalid departmentID.' });
    }
    const singleDepartment = await DepartmentModel.getDepartmentById(id);
    if (!singleDepartment) {
      res.status(400).json({ message: 'Department not found.' });
    }
    res.status(200).json(singleDepartment);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
