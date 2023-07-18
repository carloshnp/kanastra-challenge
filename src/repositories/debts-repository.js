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

export { createDebtsInDatabase };