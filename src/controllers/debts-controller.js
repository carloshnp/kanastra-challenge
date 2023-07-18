import { createDebts } from "../services/debts-service.js";
import { getDebtsAndPayments } from "../services/debts-service.js";

async function saveCsvToDatabase(req, res) {
    try {
        const row = req.rowData;
        const createdDebts = await createDebts(row);
        return res.sendStatus(201);
    } catch (error) {
        console.log('Error creating debt');
        return res.sendStatus(500);
    }
}

async function getDebtsWithPayments(req, res) {
  try {
    const debtsWithPayments = await getDebtsAndPayments();
    return res.json(debtsWithPayments);
  } catch (error) {
    console.log(error);
  }
}

export { saveCsvToDatabase, getDebtsWithPayments };