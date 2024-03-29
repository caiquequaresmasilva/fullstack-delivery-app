-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "delivery_app";

-- CreateEnum
CREATE TYPE "delivery_app"."role" AS ENUM ('customer', 'seller', 'admin');

-- CreateEnum
CREATE TYPE "delivery_app"."status" AS ENUM ('Pending', 'Preparing', 'Moving', 'Delivered');

-- CreateTable
CREATE TABLE "delivery_app"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "delivery_app"."role" NOT NULL DEFAULT 'customer',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_app"."product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "price" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_app"."order" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "totalPrice" DECIMAL(9,2) NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "deliveryNumber" TEXT NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "delivery_app"."status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_app"."product_order" (
    "productId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "product_order_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "delivery_app"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "delivery_app"."product"("name");

-- AddForeignKey
ALTER TABLE "delivery_app"."order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "delivery_app"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_app"."order" ADD CONSTRAINT "order_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "delivery_app"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_app"."product_order" ADD CONSTRAINT "product_order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "delivery_app"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_app"."product_order" ADD CONSTRAINT "product_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "delivery_app"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
