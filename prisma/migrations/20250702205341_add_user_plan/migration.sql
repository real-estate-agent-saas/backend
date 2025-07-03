/*
  Warnings:

  - You are about to drop the column `area` on the `Property` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "area",
ADD COLUMN     "areaMax" DOUBLE PRECISION,
ADD COLUMN     "areaMin" DOUBLE PRECISION,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "purpose" DROP NOT NULL,
ALTER COLUMN "housingType" DROP NOT NULL,
ALTER COLUMN "bathroomsMax" DROP NOT NULL,
ALTER COLUMN "bathroomsMin" DROP NOT NULL,
ALTER COLUMN "bedroomsMax" DROP NOT NULL,
ALTER COLUMN "bedroomsMin" DROP NOT NULL,
ALTER COLUMN "parkingSpacesMax" DROP NOT NULL,
ALTER COLUMN "parkingSpacesMin" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "PlanType" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "planEnd" TIMESTAMP(3),
ADD COLUMN     "planStart" TIMESTAMP(3);
