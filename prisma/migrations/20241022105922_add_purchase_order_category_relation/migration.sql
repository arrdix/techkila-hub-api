/*
  Warnings:

  - Added the required column `category` to the `purchaseOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchaseOrders" ADD COLUMN     "category" "PurchaseOrderCategory" NOT NULL;
