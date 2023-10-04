/*
  Warnings:

  - You are about to drop the column `paymentDate` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `receivedDate` on the `Income` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "paymentDate",
ADD COLUMN     "paidAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "receivedDate",
ADD COLUMN     "receivedAt" TIMESTAMP(3);
