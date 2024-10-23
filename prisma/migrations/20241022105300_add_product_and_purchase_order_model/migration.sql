-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Mesin_Absensi', 'Mesin_Access_Control', 'Barcode_Scanner', 'Door_Closer', 'Alat_Kasir', 'CCTV', 'Printer', 'Router', 'Smartlock', 'Accessories');

-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('Bandung', 'Jakarta');

-- CreateEnum
CREATE TYPE "PurchaseOrderCategory" AS ENUM ('Operasional');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "price" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchaseOrders" (
    "id" TEXT NOT NULL,
    "no" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "branch" "Branch" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT,

    CONSTRAINT "purchaseOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchaseOrders_no_key" ON "purchaseOrders"("no");
