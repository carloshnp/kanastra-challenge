import { Router } from "express";
import { generatePayment } from "../controllers/payload-controller.js";

const payloadRouter = Router();

payloadRouter
    .post("/", generatePayment);

export { payloadRouter };