import { createPaymentInDatabase } from "../repositories/payload-repository.js";

async function createPayment(payment) {
    try {
        const { paidAt, paidAmount, ...paymentData } = payment;
        const parsedPaidAmount = parseFloat(paidAmount);
        const parsedPaidAt = new Date(paidAt);

        const convertedPayment = {
            ...paymentData,
            paidAmount: parsedPaidAmount,
            paidAt: parsedPaidAt
        }
        
        const createdPayment = await createPaymentInDatabase(convertedPayment);
        return createdPayment;
    } catch (error) {
        console.log('Error creating payment:', error);
        throw error;
    }
}

export { createPayment };