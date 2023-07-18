import prisma from "../database/db.js";

async function createDebtsInDatabase(debts) {
    try {
        const createdDebts = [];

        for (const debt of debts) {
            let createdDebt;
            const existingDebt = await prisma.debts.findFirst({
                where: { debtId: debt.debtId },
            });

            if (existingDebt) {
                continue;
            } else {
                createdDebt = await prisma.debts.create({
                    data: {
                        name: debt.name,
                        governmentId: debt.governmentId,
                        email: debt.email,
                        debtAmount: debt.debtAmount,
                        debtDueDate: debt.debtDueDate,
                        debtId: debt.debtId,
                    },
                });
            }
            createdDebts.push(createdDebt);
        }
        return createdDebts;
    } catch (error) {
        console.log('Error creating debts in database');
        throw error;
    }
}

async function getDebtsWithPaymentsFromDatabase() {
    try {
      const debtsWithPayments = await prisma.debts.findMany({
        include: {
          payments: true,
        },
      });
  
      return debtsWithPayments;
    } catch (error) {
      console.error("Error fetching debts with payments:", error);
      throw error;
    }
  }

export { createDebtsInDatabase, getDebtsWithPaymentsFromDatabase };