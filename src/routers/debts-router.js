import { Router } from "express";
import { csvMiddleware } from '../middlewares/csv-handler.js'
import { uploadCsv } from "../middlewares/upload.js";
import { getDebtsWithPayments, saveCsvToDatabase } from "../controllers/debts-controller.js";

const debtsRouter = Router();

debtsRouter
    .get("/", getDebtsWithPayments)
    .post("/", uploadCsv, csvMiddleware, saveCsvToDatabase);

export { debtsRouter }