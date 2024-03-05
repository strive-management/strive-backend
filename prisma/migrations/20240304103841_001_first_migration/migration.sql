-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN');

-- CreateTable
CREATE TABLE "hr_employees_table" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "starting_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hr_employees_tableId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BASIC',

    CONSTRAINT "hr_employees_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_table" (
    "id" SERIAL NOT NULL,
    "department_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "department_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_table" (
    "id" SERIAL NOT NULL,
    "job_title" VARCHAR(30) NOT NULL,
    "min_salary" INTEGER NOT NULL,
    "max_salary" INTEGER NOT NULL,

    CONSTRAINT "job_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_table" (
    "id" SERIAL NOT NULL,
    "location_name" VARCHAR(30) NOT NULL,
    "number_of_staff" INTEGER NOT NULL,

    CONSTRAINT "location_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manager_table" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,

    CONSTRAINT "manager_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hr_employees_table_email_key" ON "hr_employees_table"("email");

-- AddForeignKey
ALTER TABLE "hr_employees_table" ADD CONSTRAINT "hr_employees_table_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_employees_table" ADD CONSTRAINT "hr_employees_table_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_employees_table" ADD CONSTRAINT "hr_employees_table_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hr_employees_table" ADD CONSTRAINT "hr_employees_table_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager_table" ADD CONSTRAINT "manager_table_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "hr_employees_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager_table" ADD CONSTRAINT "manager_table_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
