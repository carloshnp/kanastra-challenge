import { createDebtsInDatabase } from "../repositories/debts-repository.js";
import { getDebtsWithPaymentsFromDatabase } from "../repositories/debts-repository.js";

async function createDebts(debts) {
    try {
        const convertedDebts = debts.map((debt) => ({
            name: debt.name,
            governmentId: debt.governmentId,
            email: debt.email,
            debtAmount: parseFloat(debt.debtAmount),
            debtDueDate: new Date(debt.debtDueDate),
            debtId: debt.debtId,
          }));
      
          const createdDebts = await createDebtsInDatabase(convertedDebts);
        return createdDebts;
    } catch (error) {
        console.log("Error creating debt in service:", error);
        throw error;
    }
}

async function getDebtsAndPayments() {
  try {
    const debtsWithPayments = await getDebtsWithPaymentsFromDatabase();
    return debtsWithPayments;
  } catch (error) {
    console.log("Error fetching debts with payments:", error);
    throw error;
  }
}

export { createDebts, getDebtsAndPayments };