import { Router } from 'express'
import {getPayments, getPayment, getPaymentInvoices, createPayments,
    updatePayments,deletePayments} from '../controllers/payments.controller.js'

const router = Router()

router.get("/payments",getPayments)
router.get("/payments/:id",getPayment)
router.get("/payments/:id/invoices",getPaymentInvoices)
router.post("/payments",createPayments)
router.put("/payments/:id",updatePayments)
router.delete("/payments/:id",deletePayments)

export default router