/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `appointmentNumber` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Appointment_id_key";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "id",
ADD COLUMN     "appointmentNumber" INTEGER NOT NULL,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("userId", "appointmentNumber");
