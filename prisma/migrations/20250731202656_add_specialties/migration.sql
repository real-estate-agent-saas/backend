-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSpecialty" (
    "userId" INTEGER NOT NULL,
    "specialtyId" INTEGER NOT NULL,

    CONSTRAINT "UserSpecialty_pkey" PRIMARY KEY ("userId","specialtyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- AddForeignKey
ALTER TABLE "UserSpecialty" ADD CONSTRAINT "UserSpecialty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialty" ADD CONSTRAINT "UserSpecialty_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
