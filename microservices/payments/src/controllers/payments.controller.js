import { Payment } from '../models/Payment.js'
import { Invoice } from '../models/Invoice.js'

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll()
        req.json(payments)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPayment = async (req, res) => {
    try {
        const {id} = req.params
        const payment = await Payment.findOne({
            where: {id}
        })
        if (!payment) return res.status(404).json({message: 'Payment not found'})
            
        req.json(payment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPaymentInvoices = async (req, res) => {
    try {
        const {id} = req.params
        const payment = await Payment.findOne({
            where: {id}
        })
        if (!payment) return res.status(404).json({message: 'Payment not found'})
            
        const invoices = await Invoice.findAll({
            where: {paymentId: payment.id}
        })
        req.json(invoices)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const createPayments = async (req, res) =>{
    const {userId, reason, description, paymentMethodId, paymentDate, paymentPercentage, reference, currencyAmount, currencyAmountUnitTypeId} = req.body
    try {
        const newPayment = await Payment.create({
            userId,
            reason,
            description,
            paymentMethodId,
            paymentDate,
            paymentPercentage,
            reference,
            currencyAmount,
            currencyAmountUnitTypeId,
        })
        req.json(newPayment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updatePayment = async (req, res) => {
    try{
        const {id} = req.params
        const payment = await Payment.findByPk(id)
        payment.set(req.body)
        await payment.save()
        return req.json(payment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePayment = async (req, res) => {
    try{
        const {id} = req.params
        const payment = await Payment.findByPk(id)
        await payment.destroy()
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}