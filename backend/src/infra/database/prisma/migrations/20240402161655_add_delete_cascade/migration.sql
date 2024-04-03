-- DropForeignKey
ALTER TABLE "delivery_app"."order" DROP CONSTRAINT "order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "delivery_app"."order" DROP CONSTRAINT "order_sellerId_fkey";

-- AddForeignKey
ALTER TABLE "delivery_app"."order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "delivery_app"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_app"."order" ADD CONSTRAINT "order_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "delivery_app"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
