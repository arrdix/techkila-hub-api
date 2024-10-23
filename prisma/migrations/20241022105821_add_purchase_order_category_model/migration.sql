/*
  Warnings:

  - The values [Operasional] on the enum `PurchaseOrderCategory` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `price` on the `purchaseOrders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PurchaseOrderCategory_new" AS ENUM ('Operations', 'Inventory', 'Ads', 'Shipping', 'Salary');
ALTER TYPE "PurchaseOrderCategory" RENAME TO "PurchaseOrderCategory_old";
ALTER TYPE "PurchaseOrderCategory_new" RENAME TO "PurchaseOrderCategory";
DROP TYPE "PurchaseOrderCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "purchaseOrders" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
