/*
  Warnings:

  - Made the column `physician_id` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_physician_id_fkey";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "physician_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_physician_id_fkey" FOREIGN KEY ("physician_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
