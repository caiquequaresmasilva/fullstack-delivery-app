-- CreateTable
CREATE TABLE "DeliveryProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "price" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "DeliveryProduct_pkey" PRIMARY KEY ("id")
);
