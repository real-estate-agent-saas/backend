-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('CASA', 'APARTAMENTO');

-- CreateEnum
CREATE TYPE "PropertyPurpose" AS ENUM ('VENDA', 'LOCACAO', 'ARRENDAMENTO', 'TEMPORADA', 'PERMUTA', 'LEILAO');

-- CreateEnum
CREATE TYPE "PropertyStanding" AS ENUM ('POPULAR', 'MEDIO_PADRAO', 'ALTO_PADRAO');

-- CreateEnum
CREATE TYPE "PropertyTypology" AS ENUM ('STUDIO', 'GARDEN', 'DUPLEX', 'TRIPLEX', 'COBERTURA', 'LOFT', 'KITNET', 'PENTHOUSE', 'FLAT', 'TOWNHOUSE', 'CASA_TERREA', 'SOBRADO', 'CHALET', 'VILA', 'BANGALO', 'CASA_DE_CAMPO', 'FAZENDA', 'SITIO', 'CHACARA', 'GALPAO', 'SALA_COMERCIAL', 'LOJA', 'ANDAR_CORPORATIVO', 'TERRENO', 'LOTEAMENTO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "publicEmail" TEXT,
    "whatsapp" TEXT,
    "phone" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "profileImage" TEXT,
    "bio" TEXT,
    "careerStartDate" TIMESTAMP(3),
    "creci" TEXT,
    "gender" "Gender",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "roomsQty" INTEGER NOT NULL,
    "bathroomsQty" INTEGER NOT NULL,
    "parkingSpacesQty" INTEGER NOT NULL,
    "area" DECIMAL(65,30) NOT NULL,
    "youtubeUrl" TEXT,
    "price" DECIMAL(65,30),
    "coverImage" TEXT,
    "deliveryStatus" TEXT,
    "isFurnished" BOOLEAN,
    "isNearSubway" BOOLEAN,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "propertyPurpose" "PropertyPurpose",
    "propertyStanding" "PropertyStanding",
    "propertyType" "PropertyType",
    "propertyTypology" "PropertyTypology",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyGallery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER,
    "propertyId" INTEGER,

    CONSTRAINT "PropertyGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FloorPlanGallery" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "FloorPlanGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leisure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Leisure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecialtyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SpecialtyToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LeisureToProperty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LeisureToProperty_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Address_propertyId_key" ON "Address"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Leisure_name_key" ON "Leisure"("name");

-- CreateIndex
CREATE INDEX "_SpecialtyToUser_B_index" ON "_SpecialtyToUser"("B");

-- CreateIndex
CREATE INDEX "_LeisureToProperty_B_index" ON "_LeisureToProperty"("B");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyGallery" ADD CONSTRAINT "PropertyGallery_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FloorPlanGallery" ADD CONSTRAINT "FloorPlanGallery_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialtyToUser" ADD CONSTRAINT "_SpecialtyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialtyToUser" ADD CONSTRAINT "_SpecialtyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeisureToProperty" ADD CONSTRAINT "_LeisureToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Leisure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeisureToProperty" ADD CONSTRAINT "_LeisureToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
