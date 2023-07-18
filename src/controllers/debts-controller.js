import { createDebts } from "../services/debts-service.js";

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

export { saveCsvToDatabase };