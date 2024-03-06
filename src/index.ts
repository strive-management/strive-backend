import cors from 'cors';
import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import * as EmployeeController from './hr_employees/hr_employees.controller';
import * as DepartmentController from './departments/departments.controller';
import * as JobsController from './jobs/jobs.controller';
const express = require('express');
const app = express();
const router = Router(); // TODO: What is used for.
app.use(cors());
app.use(express.json());

dotenv.config();

app.get('/employees', EmployeeController.getAllEmployees);
app.get('/employees/:id', EmployeeController.getSingleEmployee);
app.post('/employees', EmployeeController.addSingleEmployee);
app.delete('/employees/:id', EmployeeController.deleteSingleEmloyee);
app.patch('/employees/:id', EmployeeController.updateSingleEmployee);

app.get('/departments', DepartmentController.getAllDepartments);
app.get('/departments/:id', DepartmentController.getSingleDepartment);
app.post('/departments', DepartmentController.addSingleDepartment);
app.delete('/departments/:id', DepartmentController.deleteSingleDepartment);
app.patch('/departments/:id', DepartmentController.updateDepartmentData);

app.get('/jobs', JobsController.getAllJobs);
app.get('/jobs/:id', JobsController.getSingleJob);
app.post('/jobs', JobsController.addSingleJob);
app.delete('/jobs', JobsController.deleteSingleJob);
app.patch('/jobs', JobsController.updateJobData);

app.get('/', async (req: Request, res: Response) => {
  res.send('This is working');
});

export default router;

app.listen(process.env.PORT || 8080, () => {
  console.log('server is running on port 8080 :)');
});
