/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `inclusions` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `priceType` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `completedEvents` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Vendor` table. All the data in the column will be lost.
  - The `joinedDate` column on the `Vendor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_id_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "createdAt",
DROP COLUMN "duration",
DROP COLUMN "inclusions",
DROP COLUMN "priceType",
DROP COLUMN "rating",
DROP COLUMN "reviewCount";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "completedEvents",
DROP COLUMN "portfolio",
DROP COLUMN "rating",
DROP COLUMN "reviewCount",
DROP COLUMN "verified",
DROP COLUMN "joinedDate",
ADD COLUMN     "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "providerRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_bookingId_key" ON "Transaction"("bookingId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
