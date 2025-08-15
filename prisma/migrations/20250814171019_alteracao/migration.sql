/*
  Warnings:

  - The `deliveryStatus` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PRONTO', 'VENDIDO', 'EM_OBRAS', 'LANCAMENTO', 'BREVE_LANCAMENTO', 'FUTURO_LANCAMENTO');

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "deliveryStatus",
ADD COLUMN     "deliveryStatus" "DeliveryStatus";
