-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "nextPayment" DROP NOT NULL,
ALTER COLUMN "lastPaymnet" DROP NOT NULL,
ALTER COLUMN "pay_link" DROP NOT NULL;
