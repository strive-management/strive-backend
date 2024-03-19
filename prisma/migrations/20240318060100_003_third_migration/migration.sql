/*
  Warnings:

  - You are about to drop the column `employee_id` on the `app_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UUID]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "app_users" DROP CONSTRAINT "app_users_employee_id_fkey";

-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "employee_id";

-- AlterTable
ALTER TABLE "attendance" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "managers" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "app_users_UUID_key" ON "app_users"("UUID");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managers" ADD CONSTRAINT "managers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_users"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;
