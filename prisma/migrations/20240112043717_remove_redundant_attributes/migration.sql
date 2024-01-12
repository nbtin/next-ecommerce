/*
  Warnings:

  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentIntentID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currency",
ALTER COLUMN "description" DROP NOT NULL;
