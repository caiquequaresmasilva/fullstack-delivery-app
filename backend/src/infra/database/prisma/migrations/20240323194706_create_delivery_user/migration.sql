-- CreateEnum
CREATE TYPE "Role" AS ENUM ('customer', 'seller', 'admin');

-- CreateTable
CREATE TABLE "DeliveryUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "DeliveryUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryUser_email_key" ON "DeliveryUser"("email");
