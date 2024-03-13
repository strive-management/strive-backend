"use strict";
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
exports.patchJobById = exports.deleteJob = exports.addNewJob = exports.getJobById = exports.getJobs = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield prisma.jobs.findMany();
    return jobs;
});
exports.getJobs = getJobs;
const getJobById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.jobs.findUnique({
        where: {
            id,
        },
    });
    return job;
});
exports.getJobById = getJobById;
const addNewJob = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.jobs.create({
        data,
    });
    return job;
});
exports.addNewJob = addNewJob;
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.jobs.delete({
        where: { id },
    });
    return job;
});
exports.deleteJob = deleteJob;
const patchJobById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield prisma.jobs.update({
        where: { id },
        data,
    });
    return job;
});
exports.patchJobById = patchJobById;
