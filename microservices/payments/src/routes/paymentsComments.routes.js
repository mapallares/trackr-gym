import { Router } from 'express'

const router = Router()

router.get("/paymentcomments",getPaymentComments)
router.get("/paymentcomments/:id",getPaymentComment)
router.post("/paymentcomments",createPaymentComments)
router.put("/paymentcomments",updatePaymentComment)
router.delete("/paymentcomments",deletePaymentComment)