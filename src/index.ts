import cors, { CorsOptions } from 'cors';
import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import * as EmployeeController from './hr_employees/hr_employees.controller';
import * as DepartmentController from './departments/departments.controller';
import * as JobsController from './jobs/jobs.controller';
import * as LocationController from './locations/locations_controller';
import * as UsersController from './users/users.controller';
import * as ClocksController from './clocks/clocks.controller';
import * as SchedulesController from './schedules/schedules.controller';
import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import path from 'path';
dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  clientId: process.env.FIREBASE_CLIENT_ID!,
};

const app = express();
const router = Router();

const corsOptions: CorsOptions = {
  origin: 'https://strive-frontend-gejy.onrender.com', // replace with your frontend address https://strive-frontend-gejy.onrender.com
  credentials: true,
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.post('/register', UsersController.registerUser);
app.post('/login', UsersController.loginUser);
app.post('/logout', UsersController.logoutUser);

app.get('/employees', EmployeeController.getAllEmployees);
app.get('/employees/:id', EmployeeController.getSingleEmployee);
app.get('/someEmployees', EmployeeController.displaySomeEmployeeData);
app.post('/employees', EmployeeController.addSingleEmployee);
app.delete('/employees/:id', EmployeeController.deleteSingleEmployee);
app.patch('/employees/:id', EmployeeController.updateSingleEmployee);
app.get('/employeesnumber', EmployeeController.displayEmployeeNumbers);
app.get('/employeesOnly', EmployeeController.displayOnlyYourInfo);

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

app.get('/clocks', ClocksController.getAllClocks);
app.get('/clocks/:id', ClocksController.getSingleClocks);
app.post('/clocks', ClocksController.addSingleClocks);
app.delete('/clocks/:id', ClocksController.deleteSingleClocks);
app.patch('/clocks/:id', ClocksController.updateClocksData);

app.get('/schedules', SchedulesController.getAllschedules);
app.get('/schedules/:id', SchedulesController.getSingleSchedules);
app.get('/schedulesclock', SchedulesController.getClockSchedule);
app.post('/schedules', SchedulesController.addSingleSchedules);
app.delete('/schedules/:id', SchedulesController.deleteSingleSchedules);
app.patch('/schedules/:id', SchedulesController.updateScheduleData);
app.patch('/schedulesclock/:id', SchedulesController.updateClock);
app.get('/schedulestoday', SchedulesController.workingToday);
app.get('/schedulesholiday', SchedulesController.holidayToday);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.js'));
});

app.get('/', async (req: Request, res: Response) => {
  res.send('This is working fix it');
});

export default router;

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on port 8080 :)');
});
