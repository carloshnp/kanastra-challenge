/*
  Warnings:

  - You are about to drop the column `debt_due_date` on the `debts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[debtId]` on the table `debts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `debtDueDate` to the `debts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "debts" DROP COLUMN "debt_due_date",
ADD COLUMN     "debtDueDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "debtId" TEXT NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "paidAmount" DOUBLE PRECISION NOT NULL,
    "paidBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payments_debtId_idx" ON "payments"("debtId");

-- CreateIndex
CREATE UNIQUE INDEX "debts_debtId_key" ON "debts"("debtId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "debts"("debtId") ON DELETE RESTRICT ON UPDATE CASCADE;
