import { Router } from 'express'
import {getInvoices,getInvoice,createInvoices,updateInvoices,deleteInvoices} from '../controllers/invoices.controller.js'

const router = Router()

router.get("/invoices",getInvoices)
router.get("/invoices/:id",getInvoice)
router.post("/invoices",createInvoices)
router.put("/invoices/:id",updateInvoices)
router.delete("/invoices/:id",deleteInvoices)

export default router