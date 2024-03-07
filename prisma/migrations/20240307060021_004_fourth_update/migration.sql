/*
  Warnings:

  - A unique constraint covering the columns `[employee_id]` on the table `managers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_manager_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "managers_employee_id_key" ON "managers"("employee_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "managers"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
