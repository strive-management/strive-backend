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
exports.updateDepartmentData = exports.deleteSingleDepartment = exports.addSingleDepartment = exports.getSingleDepartment = exports.getAllDepartments = void 0;
const DepartmentModel = __importStar(require("./deparments.model"));
const getAllDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield DepartmentModel.getDepartments();
        res.status(200).json(departments);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err.message);
    }
});
exports.getAllDepartments = getAllDepartments;
const getSingleDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({ message: 'Invalid department ID.' });
        }
        const singleDepartment = yield DepartmentModel.getDepartmentById(id);
        if (!singleDepartment) {
            res.status(400).json({ message: 'Department not found.' });
        }
        else {
            res.status(200).json(singleDepartment);
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.getSingleDepartment = getSingleDepartment;
const addSingleDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const addDepartment = yield DepartmentModel.addNewDepartment(data);
        res.status(200).json(addDepartment);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.addSingleDepartment = addSingleDepartment;
const deleteSingleDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteDepartment = yield DepartmentModel.deleteDepartment(id);
        if (!deleteDepartment) {
            res.status(400).json({ message: 'That department ID does not exist' });
        }
        res.status(200).send({ message: `Department ${id} has been deleted` });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.deleteSingleDepartment = deleteSingleDepartment;
const updateDepartmentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = parseInt(req.params.id);
        const updateDepartmentInfo = yield DepartmentModel.patchDepartmentById(id, data);
        if (!updateDepartmentInfo) {
            res.status(400).json({ message: 'Department not found.' });
        }
        res.status(200).json({ message: 'Department is now updated.' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.updateDepartmentData = updateDepartmentData;
