/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "app_users_email_key" ON "app_users"("email");
