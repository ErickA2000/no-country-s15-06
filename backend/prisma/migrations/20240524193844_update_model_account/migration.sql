-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "emailVerified" SET DEFAULT false;
