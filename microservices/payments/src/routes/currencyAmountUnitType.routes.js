import { Router } from 'express'

const router = Router()

router.get("/currencyamountunittype",getCurrencyAmountUnitTypes)
router.get("/currencyamountunittype/:id",getCurrencyAmountUnitType)
router.post("/currencyamountunittype",createCurrencyAmountUnitTypes)
router.put("/currencyamountunittype/:id",updateCurrencyAmountUnitTypes)
router.delete("/currencyamountunittype/:id",deleteCurrencyAmountUnitTypes)

export default router