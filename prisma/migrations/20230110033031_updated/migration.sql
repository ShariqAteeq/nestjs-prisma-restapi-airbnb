/*
  Warnings:

  - You are about to drop the `RoomKindStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomOverviewStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomRuleStep` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomKindStep" DROP CONSTRAINT "RoomKindStep_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomOverviewStep" DROP CONSTRAINT "RoomOverviewStep_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomRuleStep" DROP CONSTRAINT "RoomRuleStep_roomId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "basePrice" INTEGER,
ADD COLUMN     "bookingType" TEXT,
ADD COLUMN     "cancellationPolicy" TEXT,
ADD COLUMN     "checkinTime" TEXT,
ADD COLUMN     "checkoutTime" TEXT,
ADD COLUMN     "cleaningFee" INTEGER,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "guestRules" JSONB,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isPersonalHome" BOOLEAN,
ADD COLUMN     "kindOfPlace" TEXT,
ADD COLUMN     "kindOfProperty" TEXT,
ADD COLUMN     "maxStay" INTEGER,
ADD COLUMN     "minStay" INTEGER,
ADD COLUMN     "monthlyDiscount" TEXT,
ADD COLUMN     "noOfBathrooms" INTEGER,
ADD COLUMN     "noOfBedrooms" INTEGER,
ADD COLUMN     "noOfBeds" INTEGER,
ADD COLUMN     "noOfGuests" INTEGER,
ADD COLUMN     "roomStepType" TEXT,
ADD COLUMN     "sharedSpaces" TEXT[],
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalRooms" TEXT,
ADD COLUMN     "weeklyDiscount" TEXT;

-- DropTable
DROP TABLE "RoomKindStep";

-- DropTable
DROP TABLE "RoomOverviewStep";

-- DropTable
DROP TABLE "RoomRuleStep";

-- CreateTable
CREATE TABLE "RoomLocation" (
    "id" BIGSERIAL NOT NULL,
    "roomId" BIGINT NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "zipcode" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "RoomLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomLocation_roomId_key" ON "RoomLocation"("roomId");

-- AddForeignKey
ALTER TABLE "RoomLocation" ADD CONSTRAINT "RoomLocation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
