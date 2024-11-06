import { Router } from 'express'

const router = Router()

router.get("/invoices",getInvoices)
router.get("/invoices/:id",getInvoice)
router.post("/invoices",createInvoices)
router.put("/invoices/:id",updateInvoice)
router.delete("/invoices/:id",deleteInvoice)

export default router