/*
  Warnings:

  - You are about to drop the column `address` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Property` table. All the data in the column will be lost.
  - Added the required column `street` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Made the column `neighborhood` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bathroomsMax` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bathroomsMin` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bedroomsMax` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bedroomsMin` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parkingSpacesMax` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parkingSpacesMin` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "address",
DROP COLUMN "isAvailable",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "street" TEXT NOT NULL,
ALTER COLUMN "region" DROP NOT NULL,
ALTER COLUMN "neighborhood" SET NOT NULL,
ALTER COLUMN "bathroomsMax" SET NOT NULL,
ALTER COLUMN "bathroomsMin" SET NOT NULL,
ALTER COLUMN "bedroomsMax" SET NOT NULL,
ALTER COLUMN "bedroomsMin" SET NOT NULL,
ALTER COLUMN "parkingSpacesMax" SET NOT NULL,
ALTER COLUMN "parkingSpacesMin" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "creci" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "publicEmail" TEXT,
ADD COLUMN     "whatsapp" TEXT;
