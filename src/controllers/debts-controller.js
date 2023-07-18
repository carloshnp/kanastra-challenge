import { createDebts } from "../services/debts-service.js";
import { getDebtsAndPayments } from "../services/debts-service.js";

async function saveCsvToDatabase(req, res) {
  try {
    const rows = req.rowData;
    for (const row of rows) {
      if (!isValidRow(row)) {
        return res.status(400).send({ error: 'Invalid CSV data' });
      }
    }

    const createdDebts = await createDebts(rows);
    return res.sendStatus(201);
  } catch (error) {
    console.log('Error creating debt:', error);
    return res.sendStatus(500);
  }
}

async function getDebtsWithPayments(req, res) {
  try {
    const debtsWithPayments = await getDebtsAndPayments();
    return res.json(debtsWithPayments);
  } catch (error) {
    console.log('Error fetching debts with payments:', error);
    return res.sendStatus(500);
  }
}

function isValidRow(row) {
  const requiredFields = ['name', 'governmentId', 'email', 'debtAmount', 'debtDueDate', 'debtId'];

  for (const field of requiredFields) {
    if (!(field in row)) {
      return false;
    }
  }
  return true;
}

export { saveCsvToDatabase, getDebtsWithPayments };