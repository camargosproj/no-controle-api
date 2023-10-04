-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "paymentDate" TIMESTAMP(3),
ADD COLUMN     "repeatMonths" INTEGER;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "receivedDate" TIMESTAMP(3),
ADD COLUMN     "repeatMonths" INTEGER;
