/*
  Warnings:

  - You are about to drop the column `qtyBathrooms` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `qtyParkingSpaces` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `qtyRooms` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "qtyBathrooms",
DROP COLUMN "qtyParkingSpaces",
DROP COLUMN "qtyRooms",
ADD COLUMN     "bathroomsMax" INTEGER,
ADD COLUMN     "bathroomsMin" INTEGER,
ADD COLUMN     "bedroomsMax" INTEGER,
ADD COLUMN     "bedroomsMin" INTEGER,
ADD COLUMN     "parkingSpacesMax" INTEGER,
ADD COLUMN     "parkingSpacesMin" INTEGER;
