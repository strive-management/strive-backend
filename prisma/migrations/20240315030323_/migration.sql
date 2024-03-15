-- AlterTable
ALTER TABLE "schedule" ALTER COLUMN "scheduled_start" DROP NOT NULL,
ALTER COLUMN "scheduled_end" DROP NOT NULL;
