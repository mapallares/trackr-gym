import { Router } from 'express';
import {getInventoryMovements, getInventoryMovement,
    createInventoryMovement,updateInventoryMovement, deleteInventoryMovement} from '../controllers/inventorymovement.controller.js'

const router = Router()

router.get("/inventoryMovements", getInventoryMovements)
router.get("/inventoryMovements/:id", getInventoryMovement)
router.post("/inventoryMovements", createInventoryMovement)
router.put("/inventoryMovements/:id", updateInventoryMovement)
router.delete("/inventoryMovements/:id", deleteInventoryMovement)

export default router;

