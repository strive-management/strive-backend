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
exports.updateJobData = exports.deleteSingleJob = exports.addSingleJob = exports.getSingleJob = exports.getAllJobs = void 0;
const JobsModel = __importStar(require("./jobs.model"));
const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield JobsModel.getJobs();
        res.status(200).json(jobs);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.error(err.message);
    }
});
exports.getAllJobs = getAllJobs;
const getSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({ message: 'Invalid job ID.' });
        }
        const singleJob = yield JobsModel.getJobById(id);
        if (!singleJob) {
            res.status(400).json({ message: 'Job not found.' });
        }
        else {
            res.status(200).json(singleJob);
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.getSingleJob = getSingleJob;
const addSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const addDepartment = yield JobsModel.addNewJob(data);
        res.status(200).json(addDepartment);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.addSingleJob = addSingleJob;
const deleteSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteJob = yield JobsModel.deleteJob(id);
        if (!deleteJob) {
            res.status(400).json({ message: `Job ${id} does not exist` });
        }
        res.status(200).send({ message: `Job ${id} has been deleted` });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.deleteSingleJob = deleteSingleJob;
const updateJobData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = parseInt(req.params.id);
        const updateJobInfo = yield JobsModel.patchJobById(id, data);
        if (!updateJobInfo) {
            res.status(400).json({ message: 'Job not found.' });
        }
        res.status(200).json({ message: 'Job is now updated.' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
exports.updateJobData = updateJobData;
