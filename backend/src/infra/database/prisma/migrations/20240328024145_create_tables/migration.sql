-- CreateEnum
CREATE TYPE "Role" AS ENUM ('customer', 'seller', 'admin');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Preparing', 'Moving', 'Delivered');

-- CreateTable
CREATE TABLE "delivery_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'customer',

    CONSTRAINT "delivery_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "price" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "delivery_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_order" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "totalPrice" DECIMAL(9,2) NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "deliveryNumber" TEXT NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "delivery_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_product_order" (
    "productId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "delivery_product_order_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_user_email_key" ON "delivery_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_product_name_key" ON "delivery_product"("name");

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "delivery_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "delivery_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_product_order" ADD CONSTRAINT "delivery_product_order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "delivery_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_product_order" ADD CONSTRAINT "delivery_product_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "delivery_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
