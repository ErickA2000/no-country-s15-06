/*
  Warnings:

  - You are about to drop the column `idPlanPrivider` on the `Membership` table. All the data in the column will be lost.
  - Added the required column `idPlanProvider` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "idPlanPrivider",
ADD COLUMN     "idPlanProvider" TEXT NOT NULL;
