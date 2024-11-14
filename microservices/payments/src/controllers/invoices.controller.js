import { Invoice } from '../models/Invoice.js'

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll()
        req.json(invoices)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getInvoice = async (req, res) => {
    try {
        const {id} = req.params
        const invoice = await Invoice.findOne({
            where: {id}
        })
        if(!invoice) return res.status(404).json({message: 'Invoice not found'})
            
        req.json(invoice)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createInvoices = async (req, res) => {
    const{paymentId, emissionDate, totalCurrencyAmount, currencyAmountUnitTypeId, code, isActive, isCorrect, isValid} = req.body
    try {
        const newInvoice = await Invoice.create({
            paymentId,
            emissionDate,
            totalCurrencyAmount,
            currencyAmountUnitTypeId,
            code,
            isActive,
            isCorrect,
            isValid
        })
        req.json(newInvoice)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateInvoices = async (req, res) => {
    try {
        const {id} = req.params
        const invoice = await Invoice.findByPk(id)
        invoice.set(req.body)
        await invoice.save()
        return req.json(invoice)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteInvoices = async (req, res) => {
    try {
        const {id} = req.params
        await Invoice.destroy({
            where: {id}
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}