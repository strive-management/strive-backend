/*
  Warnings:

  - You are about to drop the column `hr_employees_tableId` on the `hr_employees_table` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "hr_employees_table" DROP CONSTRAINT "hr_employees_table_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "manager_table" DROP CONSTRAINT "manager_table_employee_id_fkey";

-- AlterTable
ALTER TABLE "hr_employees_table" DROP COLUMN "hr_employees_tableId",
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT,
ALTER COLUMN "manager_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "manager_table" ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "hr_employees_table" ADD CONSTRAINT "hr_employees_table_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "manager_table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager_table" ADD CONSTRAINT "manager_table_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "hr_employees_table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
