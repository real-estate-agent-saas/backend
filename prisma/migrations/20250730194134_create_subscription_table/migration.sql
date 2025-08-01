/*
  Warnings:

  - You are about to drop the column `plan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `planEnd` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `planStart` on the `User` table. All the data in the column will be lost.
  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Masculino', 'Feminino', 'Outro');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plan",
DROP COLUMN "planEnd",
DROP COLUMN "planStart",
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "planType" "PlanType" NOT NULL DEFAULT 'FREE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
