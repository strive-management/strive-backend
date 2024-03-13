"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const EmployeeController = __importStar(require("./hr_employees/hr_employees.controller"));
const DepartmentController = __importStar(require("./departments/departments.controller"));
const JobsController = __importStar(require("./jobs/jobs.controller"));
const LocationController = __importStar(require("./locations/locations_controller"));
const UsersController = __importStar(require("./users/users.controller"));
const ClocksController = __importStar(require("./clocks/clocks.controller"));
const express = require('express');
const app = express();
const router = (0, express_1.Router)();
app.use((0, cors_1.default)());
app.use(express.json());
dotenv_1.default.config();
app.post('/users', UsersController.addNewUser);
app.get('/employees', EmployeeController.getAllEmployees);
app.get('/employees/:id', EmployeeController.getSingleEmployee);
app.get('/someEmployees', EmployeeController.displaySomeEmployeeData);
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
app.get('/clocks', ClocksController.getAllClocks);
app.get('/clocks/:id', ClocksController.getSingleClocks);
app.post('/clocks', ClocksController.addSingleClocks);
app.delete('/clocks/:id', ClocksController.deleteSingleClocks);
app.patch('/clocks/:id', ClocksController.updateClocksData);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('This is working');
}));
exports.default = router;
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080 :)');
});
