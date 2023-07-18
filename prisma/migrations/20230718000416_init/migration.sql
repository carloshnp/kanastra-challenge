-- CreateTable
CREATE TABLE "debts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "governmentId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "debtAmount" DOUBLE PRECISION NOT NULL,
    "debt_due_date" TIMESTAMP(3) NOT NULL,
    "debtId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "debts_pkey" PRIMARY KEY ("id")
);
