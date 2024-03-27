-- CreateTable
CREATE TABLE "DeliveryProductsOnOrders" (
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "DeliveryProductsOnOrders_pkey" PRIMARY KEY ("productId","orderId")
);

-- AddForeignKey
ALTER TABLE "DeliveryProductsOnOrders" ADD CONSTRAINT "DeliveryProductsOnOrders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "DeliveryProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryProductsOnOrders" ADD CONSTRAINT "DeliveryProductsOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "DeliveryOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
