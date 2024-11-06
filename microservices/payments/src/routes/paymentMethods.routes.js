import { Router } from 'express'

const router = Router()

router.get("/paymentmethods",getPaymentMethods)
router.get("/paymentmethods/:id",getPaymentMethod)
router.post("/paymentmethods",createPaymentMethods)
router.put("/paymentmethods/:id",updatePaymentMethods)
router.delete("/paymentmethods/:id",deletePaymentMethods)

export default router