/*
  Warnings:

  - You are about to drop the `UserSpecialty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSpecialty" DROP CONSTRAINT "UserSpecialty_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpecialty" DROP CONSTRAINT "UserSpecialty_userId_fkey";

-- DropTable
DROP TABLE "UserSpecialty";

-- CreateTable
CREATE TABLE "_SpecialtyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SpecialtyToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SpecialtyToUser_B_index" ON "_SpecialtyToUser"("B");

-- AddForeignKey
ALTER TABLE "_SpecialtyToUser" ADD CONSTRAINT "_SpecialtyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialtyToUser" ADD CONSTRAINT "_SpecialtyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
