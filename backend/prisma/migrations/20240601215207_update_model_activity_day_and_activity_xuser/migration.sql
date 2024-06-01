/*
  Warnings:

  - Added the required column `idActivityDay` to the `ActivityXuser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityXuser" ADD COLUMN     "idActivityDay" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityXuser" ADD CONSTRAINT "ActivityXuser_idActivityDay_fkey" FOREIGN KEY ("idActivityDay") REFERENCES "ActivityDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
