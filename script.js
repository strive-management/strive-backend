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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.jobs.deleteMany(); // delete the existing data everytime
        yield prisma.departments.deleteMany(); // delete the existing data everytime
        yield prisma.locations.deleteMany(); // delete the existing data everytime
        yield prisma.employees.deleteMany(); // delete the existing data everytime
        yield prisma.departments.createMany({
            data: [
                { department_name: "Engineering" },
                { department_name: "Human Resources" },
                { department_name: "Marketing" },
            ],
        });
        // Seed jobs
        yield prisma.jobs.createMany({
            data: [
                { job_title: "Software Engineer" },
                { job_title: "Product Manager" },
                { job_title: "HR Specialist" },
            ],
        });
        // Seed locations
        yield prisma.locations.createMany({
            data: [
                { location_name: "New York", number_of_staff: 50 },
                { location_name: "San Francisco", number_of_staff: 30 },
                { location_name: "Berlin", number_of_staff: 20 },
            ],
        });
        yield prisma.employees.createMany({
            data: [
                {
                    first_name: "Alice",
                    last_name: "Williams",
                    email: "alice.williams@example.com",
                    phone_number: "9876543210",
                    job_title: "Product Manager",
                    department_name: "Marketing",
                    location_name: "Berlin",
                    salary: 80000,
                    role: "BASIC",
                },
                {
                    first_name: "Bob",
                    last_name: "Johnson",
                    email: "bob.johnson@example.com",
                    phone_number: "8765432109",
                    job_title: "HR Specialist",
                    department_name: "Human Resources",
                    location_name: "New York",
                    salary: 65000,
                    role: "BASIC",
                },
                {
                    first_name: "Carol",
                    last_name: "Smith",
                    email: "carol.smith@example.com",
                    phone_number: "7654321098",
                    job_title: "Software Engineer",
                    department_name: "Engineering",
                    location_name: "San Francisco",
                    salary: 90000,
                    role: "ADMIN",
                },
                {
                    first_name: "David",
                    last_name: "Brown",
                    email: "david.brown@example.com",
                    phone_number: "6543210987",
                    job_title: "Product Manager",
                    department_name: "Marketing",
                    location_name: "Berlin",
                    salary: 85000,
                    role: "BASIC",
                },
                {
                    first_name: "Eve",
                    last_name: "Davis",
                    email: "eve.davis@example.com",
                    phone_number: "5432109876",
                    job_title: "Software Engineer",
                    department_name: "Engineering",
                    location_name: "New York",
                    salary: 95000,
                    role: "BASIC",
                },
            ],
        });
        // console.log(jobs);
        // console.log(locations);
        // console.log(departments);
        // console.log(users);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
