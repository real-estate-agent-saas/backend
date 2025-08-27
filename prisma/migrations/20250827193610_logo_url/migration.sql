/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `DinamicWebsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DinamicWebsite" DROP COLUMN "logoUrl",
ADD COLUMN     "logo" TEXT;
