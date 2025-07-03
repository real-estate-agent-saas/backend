-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "qtyRooms" INTEGER,
    "qtyBathrooms" INTEGER,
    "qtyParkingSpaces" INTEGER,
    "area" DOUBLE PRECISION,
    "address" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "featuredImage" TEXT,
    "photoGallery" TEXT[],
    "state" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "zipCode" TEXT,
    "neighborhood" TEXT,
    "youTubeVideo" TEXT,
    "purpose" TEXT NOT NULL,
    "housingType" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
