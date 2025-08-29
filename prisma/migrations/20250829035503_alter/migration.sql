/*
  Warnings:

  - You are about to drop the column `url` on the `FloorPlanGallery` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeUrl` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `PropertyGallery` table. All the data in the column will be lost.
  - You are about to drop the column `previewUrl` on the `Template` table. All the data in the column will be lost.
  - Added the required column `URL` to the `FloorPlanGallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `URL` to the `PropertyGallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FloorPlanGallery" DROP COLUMN "url",
ADD COLUMN     "URL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "youtubeUrl",
ADD COLUMN     "youtubeURL" TEXT;

-- AlterTable
ALTER TABLE "PropertyGallery" DROP COLUMN "url",
ADD COLUMN     "URL" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "previewUrl",
ADD COLUMN     "previewURL" TEXT;
