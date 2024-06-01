/*
  Warnings:

  - Added the required column `numberPeople` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentFrequency` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "numberPeople" INTEGER NOT NULL,
ADD COLUMN     "paymentFrequency" TEXT NOT NULL;
