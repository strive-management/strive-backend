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
exports.getSomeEmployees = exports.patchEmployeeById = exports.deleteEmployeeById = exports.addNewEmployee = exports.getEmployeeById = exports.getEmployees = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.employees.findMany();
    return users;
});
exports.getEmployees = getEmployees;
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.employees.findUnique({
        where: {
            id,
        },
    });
    return user;
});
exports.getEmployeeById = getEmployeeById;
const addNewEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.employees.create({
        data,
    });
    return user;
});
exports.addNewEmployee = addNewEmployee;
const deleteEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.employees.delete({
        where: { id },
    });
    return user;
});
exports.deleteEmployeeById = deleteEmployeeById;
const patchEmployeeById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.employees.update({
        where: { id },
        data,
    });
    return user;
});
exports.patchEmployeeById = patchEmployeeById;
const getSomeEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.employees.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            job_title: true,
            email: true,
            phone_number: true,
            location_name: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return users;
});
exports.getSomeEmployees = getSomeEmployees;
