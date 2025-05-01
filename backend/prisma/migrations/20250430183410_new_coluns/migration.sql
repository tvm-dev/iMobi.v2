/*
  Warnings:

  - You are about to drop the column `actions` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "actions",
ADD COLUMN     "date" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "hour" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "observations" TEXT NOT NULL DEFAULT '';
