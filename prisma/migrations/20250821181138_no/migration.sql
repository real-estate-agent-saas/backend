/*
  Warnings:

  - You are about to drop the column `primaryColor` on the `DinamicWebsite` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryColor` on the `DinamicWebsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DinamicWebsite" DROP COLUMN "primaryColor",
DROP COLUMN "secondaryColor";
