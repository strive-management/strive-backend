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
exports.patchDepartmentById = exports.deleteDepartment = exports.addNewDepartment = exports.getDepartmentById = exports.getDepartments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield prisma.departments.findMany();
    return departments;
});
exports.getDepartments = getDepartments;
const getDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma.departments.findUnique({
        where: {
            id,
        },
    });
    return department;
});
exports.getDepartmentById = getDepartmentById;
const addNewDepartment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma.departments.create({
        data,
    });
    return department;
});
exports.addNewDepartment = addNewDepartment;
const deleteDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma.departments.delete({
        where: { id },
    });
    return department;
});
exports.deleteDepartment = deleteDepartment;
const patchDepartmentById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma.departments.update({
        where: { id },
        data,
    });
    return department;
});
exports.patchDepartmentById = patchDepartmentById;
