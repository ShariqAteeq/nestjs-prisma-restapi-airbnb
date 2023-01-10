-- CreateEnum
CREATE TYPE "RoomStepType" AS ENUM ('ROOM_KIND', 'ROOM_RULE', 'ROOM_OVERVIEW');

-- CreateTable
CREATE TABLE "Room" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomKindStep" (
    "id" BIGSERIAL NOT NULL,
    "roomId" BIGINT NOT NULL,
    "roomStepType" TEXT,
    "kindOfProperty" TEXT,
    "kindOfPlace" TEXT,
    "totalRooms" TEXT,
    "amenities" TEXT[],
    "sharedSpaces" TEXT[],
    "noOfGuests" INTEGER,
    "noOfBedrooms" INTEGER,
    "noOfBeds" INTEGER,
    "noOfBathrooms" INTEGER,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "line1" TEXT,
    "line2" TEXT,
    "zipcode" TEXT,
    "isPersonalHome" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "RoomKindStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomOverviewStep" (
    "id" BIGSERIAL NOT NULL,
    "roomId" BIGINT NOT NULL,
    "images" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roomStepType" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "RoomOverviewStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomRuleStep" (
    "id" BIGSERIAL NOT NULL,
    "roomId" BIGINT NOT NULL,
    "guestRules" JSONB,
    "checkinTime" TEXT,
    "checkoutTime" TEXT,
    "cancellationPolicy" TEXT,
    "currency" TEXT,
    "basePrice" INTEGER,
    "cleaningFee" INTEGER,
    "weeklyDiscount" TEXT,
    "monthlyDiscount" TEXT,
    "availableDate" TEXT,
    "minStay" INTEGER,
    "maxStay" INTEGER,
    "bookingType" TEXT,
    "roomStepType" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "RoomRuleStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomKindStep_roomId_key" ON "RoomKindStep"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomOverviewStep_roomId_key" ON "RoomOverviewStep"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomRuleStep_roomId_key" ON "RoomRuleStep"("roomId");

-- AddForeignKey
ALTER TABLE "RoomKindStep" ADD CONSTRAINT "RoomKindStep_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomOverviewStep" ADD CONSTRAINT "RoomOverviewStep_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomRuleStep" ADD CONSTRAINT "RoomRuleStep_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
