/*
  Warnings:

  - You are about to drop the `department_table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hr_employees_table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location_table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `manager_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hr_employees_table" DROP CONSTRAINT "hr_employees_table_department_id_fkey";

-- DropForeignKey
ALTER TABLE "hr_employees_table" DROP CONSTRAINT "hr_employees_table_job_id_fkey";

-- DropForeignKey
ALTER TABLE "hr_employees_table" DROP CONSTRAINT "hr_employees_table_location_id_fkey";

-- DropForeignKey
ALTER TABLE "hr_employees_table" DROP CONSTRAINT "hr_employees_table_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "manager_table" DROP CONSTRAINT "manager_table_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "manager_table" DROP CONSTRAINT "manager_table_job_id_fkey";

-- DropTable
DROP TABLE "department_table";

-- DropTable
DROP TABLE "hr_employees_table";

-- DropTable
DROP TABLE "job_table";

-- DropTable
DROP TABLE "location_table";

-- DropTable
DROP TABLE "manager_table";

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30),
    "phone_number" TEXT,
    "job_title" TEXT,
    "manager_id" INTEGER,
    "department_name" TEXT,
    "location_name" TEXT,
    "starting_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BASIC',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "department_name" VARCHAR(30),

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "job_title" VARCHAR(30) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "location_name" VARCHAR(30) NOT NULL,
    "number_of_staff" INTEGER DEFAULT 0,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "job_title" TEXT,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "status" TEXT NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "UUID" INTEGER NOT NULL,
    "employee_id" INTEGER,

    CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clock" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "clock_in" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "clock_out" TIMESTAMP(3),

    CONSTRAINT "clock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "departments_department_name_key" ON "departments"("department_name");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_job_title_key" ON "jobs"("job_title");

-- CreateIndex
CREATE UNIQUE INDEX "locations_location_name_key" ON "locations"("location_name");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_job_title_fkey" FOREIGN KEY ("job_title") REFERENCES "jobs"("job_title") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "departments"("department_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_location_name_fkey" FOREIGN KEY ("location_name") REFERENCES "locations"("location_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_job_title_fkey" FOREIGN KEY ("job_title") REFERENCES "jobs"("job_title") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_users" ADD CONSTRAINT "app_users_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clock" ADD CONSTRAINT "clock_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
