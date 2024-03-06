import { Request, Response } from 'express';
import * as DepartmentModel from './deparments.model';
import axios from 'axios';
import e from 'cors';
import { deprecate } from 'util';

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
    } else {
      res.status(200).json(singleDepartment);
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const addSingleDepartment = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const addDepartment = await DepartmentModel.addNewDepartment(data);
    res.status(200).json(addDepartment);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteSingleDepartment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleteDepartment = await DepartmentModel.deleteDepartment(id);
    if (!deleteDepartment) {
      res.status(400).json({ message: 'That department ID does not exist' });
    }
    res.status(200).send({ message: `Department${id} has been deleted` });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateDepartmentData = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    const updateDepartmentInfo = await DepartmentModel.patchDepartmentById(
      id,
      data
    );
    if (!updateDepartmentInfo) {
      res.status(400).json({ message: 'Department not found.' });
    }
    res.status(200).json({ message: 'Department is now updated.' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
