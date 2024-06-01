/*
  Warnings:

  - Added the required column `idInstructor` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "idInstructor" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_idInstructor_fkey" FOREIGN KEY ("idInstructor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
