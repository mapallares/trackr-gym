import { Router } from 'express'

const router = Router()

router.get("/payments",getPayments)
router.get("/payments/:id",getPayment)
router.get("/payments/:id/invoices",getPaymentInvoices)
router.post("/payments",createPayments)
router.put("/payments/:id",updatePayment)
router.delete("/payments/:id",deletePayment)

export default router