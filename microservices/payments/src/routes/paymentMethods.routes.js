import { Router } from 'express'
import {getPaymentMethods,getPaymentMethod,createPaymentMethods,updatePaymentMethods,
    deletePaymentMethods} from '../controllers/paymentMethods.controller.js'

const router = Router()

router.get("/paymentmethods",getPaymentMethods)
router.get("/paymentmethods/:id",getPaymentMethod)
router.post("/paymentmethods",createPaymentMethods)
router.put("/paymentmethods/:id",updatePaymentMethods)
router.delete("/paymentmethods/:id",deletePaymentMethods)

export default router