import { Router } from 'express'

const router = Router()

router.get("/currencyamountunittype",getCurrencyAmountUnitTypes)
router.get("/currencyamountunittype/:id",getCurrencyAmountUnitType)
router.post("/currencyamountunittype",createCurrencyAmountUnitType)
router.put("/currencyamountunittype/:id",updateCurrencyAmountUnitType)
router.delete("/currencyamountunittype/:id",deleteCurrencyAmountUnitType)

export default router