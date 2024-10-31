import { Router } from 'express';
import {getDetail, getDetails, createDetail, updateDetail, deleteDetail} from '../controllers/details.controller.js'

const router = Router()

router.get("/details",getDetails)
router.get("/details/:id",getDetail)
router.post("/details",createDetail)
router.put("/details/:id", updateDetail)
router.delete("/details/:id",deleteDetail)

export default router;