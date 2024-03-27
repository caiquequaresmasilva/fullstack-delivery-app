-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Preparing', 'Moving', 'Delivered');

-- AlterTable
ALTER TABLE "DeliveryUser" ALTER COLUMN "role" SET DEFAULT 'customer';

-- CreateTable
CREATE TABLE "DeliveryOrder" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "totalPrice" DECIMAL(9,2) NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "deliveryNumber" TEXT NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "DeliveryOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "DeliveryUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT "DeliveryOrder_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "DeliveryUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
