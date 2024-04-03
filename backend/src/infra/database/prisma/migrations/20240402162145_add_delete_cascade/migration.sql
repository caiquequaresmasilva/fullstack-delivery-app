-- DropForeignKey
ALTER TABLE "delivery_app"."product_order" DROP CONSTRAINT "product_order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "delivery_app"."product_order" DROP CONSTRAINT "product_order_productId_fkey";

-- AddForeignKey
ALTER TABLE "delivery_app"."product_order" ADD CONSTRAINT "product_order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "delivery_app"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_app"."product_order" ADD CONSTRAINT "product_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "delivery_app"."order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
