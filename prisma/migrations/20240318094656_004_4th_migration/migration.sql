/*
  Warnings:

  - You are about to drop the column `password` on the `app_users` table. All the data in the column will be lost.
  - Made the column `UUID` on table `app_users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "password",
ALTER COLUMN "UUID" SET NOT NULL;
