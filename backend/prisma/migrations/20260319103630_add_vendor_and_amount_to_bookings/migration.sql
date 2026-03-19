/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `vendorId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceType` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_vendorId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "vendorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "createdAt",
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "inclusions" TEXT[],
ADD COLUMN     "priceType" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "startingPrice" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "portfolio" TEXT[],
    "joinedDate" TEXT NOT NULL,
    "completedEvents" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
