import { Router } from 'express'
import {getPaymentComments,getPaymentComment,createPaymentComments,updatePaymentComments,
    deletePaymentComments} from '../controllers/paymentsComments.controller.js'

const router = Router()

router.get("/paymentcomments",getPaymentComments)
router.get("/paymentcomments/:id",getPaymentComment)
router.post("/paymentcomments",createPaymentComments)
router.put("/paymentcomments",updatePaymentComments)
router.delete("/paymentcomments",deletePaymentComments)

export default router