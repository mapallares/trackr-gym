import { CurrencyAmountUnitType } from '../models/CurrencyAmountUnitType.js'

export const getCurrencyAmountUnitTypes = async (req, res) => {
    try {
        const currencyAmountUnitTypes = await CurrencyAmountUnitType.findAll()
        req.json(currencyAmountUnitTypes)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCurrencyAmountUnitType = async (req, res) => {
    try {
        const {id} = req.params
        const currencyAmountUnitType = await CurrencyAmountUnitType.findOne({
            where: {id}
        })
        if (!currencyAmountUnitType) return res.status(404).json({message: 'Currency Amount Unit Type not found'})
            
        req.json(currencyAmountUnitType)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createCurrencyAmountUnitTypes = async (req, res) => {
    const {name, abbreviation, symbol, unit, description, status, isActive} = req.body
    try {
        const newCurrencyAmountUnitType = await CurrencyAmountUnitType.create({
            name,
            abbreviation,
            symbol,
            unit,
            description,
            status,
            isActive
        })
        req.json(newCurrencyAmountUnitType)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateCurrencyAmountUnitTypes = async (req, res) => {
    try {
        const {id} = req.params
        const currencyAmountUnitType = await CurrencyAmountUnitType.findByPk(id)
        currencyAmountUnitType.set(req.body)
        await currencyAmountUnitType.save()
        return req.json(currencyAmountUnitType)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteCurrencyAmountUnitTypes = async (req, res) => {
    try {
        const {id} = req.params
        await CurrencyAmountUnitType.destroy({
            where: {id}
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}