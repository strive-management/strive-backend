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
Object.defineProperty(exports, "__esModule", { value: true });
exports.displaySomeEmployeeData = exports.updateSingleEmployee = exports.deleteSingleEmployee = exports.addSingleEmployee = exports.getSingleEmployee = exports.getAllEmployees = void 0;
const EmployeeModel = __importStar(require("./hr_employees.model"));
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield EmployeeModel.getEmployees();
        res.status(200).json(employees);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err.message);
    }
});
exports.getAllEmployees = getAllEmployees;
const getSingleEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({ message: 'Invalid user ID.' });
        }
        const singleEmployee = yield EmployeeModel.getEmployeeById(id);
        if (!singleEmployee) {
            res.status(400).json({ message: 'User not found.' });
        }
        else {
            res.status(200).json(singleEmployee);
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.getSingleEmployee = getSingleEmployee;
const addSingleEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const addEmployee = yield EmployeeModel.addNewEmployee(data);
        res.status(200).json(addEmployee);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.addSingleEmployee = addSingleEmployee;
const deleteSingleEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteEmployee = yield EmployeeModel.deleteEmployeeById(id);
        if (!deleteEmployee) {
            res.status(400).json({ message: 'User not found.' });
        }
        res.status(200).send({ message: `User no. ${id} is now deleted` });
    }
    catch (err) {
        console.error(err.messsage);
        res.status(500).json({ message: err.message });
    }
});
exports.deleteSingleEmployee = deleteSingleEmployee;
const updateSingleEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { first_name, last_name, email, phone_number, job_id, manager_id, department_id, location_id, starting_date} = req.body
        const data = req.body;
        const id = parseInt(req.params.id);
        const user = yield EmployeeModel.patchEmployeeById(id, data);
        if (!user) {
            res.status(400).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User is now updated.' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.updateSingleEmployee = updateSingleEmployee;
const displaySomeEmployeeData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const someEmployees = yield EmployeeModel.getSomeEmployees();
        res.status(200).json(someEmployees);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err.message);
    }
});
exports.displaySomeEmployeeData = displaySomeEmployeeData;
