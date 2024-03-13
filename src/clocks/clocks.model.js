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
exports.patchClocksById = exports.deleteClocks = exports.addNewClocks = exports.getClocksById = exports.getClocks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getClocks = () => __awaiter(void 0, void 0, void 0, function* () {
    const clock = yield prisma.clock.findMany();
    return clock;
});
exports.getClocks = getClocks;
const getClocksById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clock = yield prisma.clock.findUnique({
        where: {
            id,
        },
    });
    return clock;
});
exports.getClocksById = getClocksById;
const addNewClocks = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const clock = yield prisma.clock.create({
        data,
    });
    return clock;
});
exports.addNewClocks = addNewClocks;
const deleteClocks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clock = yield prisma.clock.delete({
        where: { id },
    });
    return clock;
});
exports.deleteClocks = deleteClocks;
const patchClocksById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const clock = yield prisma.clock.update({
        where: { id },
        data,
    });
    return clock;
});
exports.patchClocksById = patchClocksById;
