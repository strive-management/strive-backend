import cors from 'cors';
import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import * as EmployeeController from './hr_employees/hr_employees.controller';
import * as DepartmentController from './departments/departments.controller';
import * as JobsController from './jobs/jobs.controller';
import * as LocationController from './locations/locations_controller';
import * as UsersController from './users/users.controller';
const express = require('express');
const app = express();
const router = Router();
app.use(cors());
app.use(express.json());

dotenv.config();

app.post('/users', UsersController.addNewUser);

app.get('/employees', EmployeeController.getAllEmployees);
app.get('/employees/:id', EmployeeController.getSingleEmployee);
app.post('/employees', EmployeeController.addSingleEmployee);
app.delete('/employees/:id', EmployeeController.deleteSingleEmployee);
app.patch('/employees/:id', EmployeeController.updateSingleEmployee);

app.get('/departments', DepartmentController.getAllDepartments);
app.get('/departments/:id', DepartmentController.getSingleDepartment);
app.post('/departments', DepartmentController.addSingleDepartment);
app.delete('/departments/:id', DepartmentController.deleteSingleDepartment);
app.patch('/departments/:id', DepartmentController.updateDepartmentData);

app.get('/jobs', JobsController.getAllJobs);
app.get('/jobs/:id', JobsController.getSingleJob);
app.post('/jobs', JobsController.addSingleJob);
app.delete('/jobs/:id', JobsController.deleteSingleJob);
app.patch('/jobs/:id', JobsController.updateJobData);

app.get('/locations', LocationController.getAllLocations);
app.get('/locations/:id', LocationController.getSingleLocation);
app.post('/locations', LocationController.addSingleLocation);
app.delete('/locations/:id', LocationController.deleteSingleLocation);
app.patch('/locations/:id', LocationController.updateLocationData);

app.get('/', async (req: Request, res: Response) => {
  res.send('This is working');
});

export default router;

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on port 8080 :)');
});
