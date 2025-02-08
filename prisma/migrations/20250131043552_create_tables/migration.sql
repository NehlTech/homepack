-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'USER';

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_physician_id_fkey";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "physician_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_physician_id_fkey" FOREIGN KEY ("physician_id") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
