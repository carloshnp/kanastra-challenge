import { createPayment } from "../services/payload-service.js";

async function generatePayment(req, res) {
    try {
        const payment = req.body;
        const savedPayment = await createPayment(payment);
        if (savedPayment && savedPayment.status === 409) {
            return res.status(savedPayment.status).json({ message: savedPayment.message });
          }
        return res.status(201).json({
            message: 'Payment done successfully!'
        })
    } catch (error) {
        console.log(error);
    }
}

export { generatePayment };