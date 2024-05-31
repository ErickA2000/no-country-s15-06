/*
  Warnings:

  - You are about to drop the column `lastPaymnet` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "lastPaymnet",
ADD COLUMN     "lastPayment" TIMESTAMP(3);
