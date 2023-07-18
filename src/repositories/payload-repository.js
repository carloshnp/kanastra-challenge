import prisma from "../database/db.js";

async function createPaymentInDatabase(payment) {
    try {
        const existingPayment = await prisma.payments.findFirst({
            where: { debtId: payment.debtId }
        })
        if (existingPayment) {
            return { message: "This payment was already made", status: 409 };
        } else {
            const createdPayment = await prisma.payments.create({
                data: {
                    debtId: payment.debtId,
                    paidAt: payment.paidAt,
                    paidAmount: payment.paidAmount,
                    paidBy: payment.paidBy,
                },
            })
            return createdPayment;
        }
    } catch (error) {
        console.error('Error creating payment in database:', error);
        throw error;
    }
}

export { createPaymentInDatabase };