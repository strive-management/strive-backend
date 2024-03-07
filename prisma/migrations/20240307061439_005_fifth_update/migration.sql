-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_manager_id_fkey";

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
