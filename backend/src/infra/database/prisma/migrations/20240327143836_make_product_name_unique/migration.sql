/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `DeliveryProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DeliveryProduct_name_key" ON "DeliveryProduct"("name");
