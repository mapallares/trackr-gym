import { Router } from 'express'
import {getCurrencyAmountUnitTypes, getCurrencyAmountUnitType, createCurrencyAmountUnitTypes
    , updateCurrencyAmountUnitTypes, deleteCurrencyAmountUnitTypes } from '../controllers/currencyAmountUnitType.controller.js'

const router = Router()

router.get("/currencyamountunittype",getCurrencyAmountUnitTypes)
router.get("/currencyamountunittype/:id",getCurrencyAmountUnitType)
router.post("/currencyamountunittype",createCurrencyAmountUnitTypes)
router.put("/currencyamountunittype/:id",updateCurrencyAmountUnitTypes)
router.delete("/currencyamountunittype/:id",deleteCurrencyAmountUnitTypes)

export default router