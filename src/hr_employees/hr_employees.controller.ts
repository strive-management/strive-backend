import { Request, Response } from 'express';
import * as EmployeeModel from './hr_employees.model';
import axios from 'axios';
import e from 'cors';

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.getEmployees();
    res.status(200).json(employees);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};

export const getSingleEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ message: 'Invalid user ID.' });
    }
    console.log(getSingleEmployee);

    const singleEmployee = await EmployeeModel.getEmployeeById(id);
    if (!singleEmployee) {
      res.status(400).json({ message: 'User not found.' });
    } else {
      res.status(200).json(singleEmployee);
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const addSingleEmployee = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const addEmployee = await EmployeeModel.addNewEmployee(data);
    res.status(200).json(addEmployee);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteSingleEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleteEmployee = await EmployeeModel.deleteEmployeeById(id);
    if (!deleteEmployee) {
      res.status(400).json({ message: 'User not found.' });
    }
    res.status(200).send({ message: `User no. ${id} is now deleted` });
  } catch (err: any) {
    console.error(err.messsage);
    res.status(500).json({ message: err.message });
  }
};

export const updateSingleEmployee = async (req: Request, res: Response) => {
  try {
    // const { first_name, last_name, email, phone_number, job_id, manager_id, department_id, location_id, starting_date} = req.body

    const data = req.body;
    const id = parseInt(req.params.id);
    const user = await EmployeeModel.patchEmployeeById(id, data);
    if (!user) {
      res.status(400).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User is now updated.' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const displaySomeEmployeeData = async (req: Request, res: Response) => {
  try {
    const someEmployees = await EmployeeModel.getSomeEmployees();
    res.status(200).json(someEmployees);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};

export const displayEmployeeNumbers = async (req: Request, res: Response) => {
  try {
    const employeeCount = await EmployeeModel.employeeCount();
    res.status(200).json(employeeCount);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};
