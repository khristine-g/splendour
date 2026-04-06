-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "portfolio" TEXT[],
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
