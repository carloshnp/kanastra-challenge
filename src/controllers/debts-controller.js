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
    if (createdDebts.length === 0) {
      return res.status(409).send({ error: 'Debt already added to the database' })
    } else {

      for (const debt of createdDebts) {
        const emailContent = `Dear ${debt.name},\n\nYou have a debt of ${debt.debtAmount} due on ${debt.debtDueDate}. Please make the payment as soon as possible.\n\nRegards,\nKanastra. `;
        console.log(emailContent);
      }
      return res.status(201).send({ message: 'Emails sent successfully!' })
    }
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