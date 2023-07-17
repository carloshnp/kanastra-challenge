import { Router } from "express";
import { csvMiddleware } from '../middlewares/csv-handler.js'
import { uploadCsv } from "../middlewares/upload.js";
import { saveCsvToDatabase } from "../controllers/debts-controller.js";

const debtsRouter = Router();

debtsRouter
    .post("/", uploadCsv, csvMiddleware, saveCsvToDatabase);

export { debtsRouter }