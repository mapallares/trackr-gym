import { PaymentMethod } from '../models/PaymentMethod.js'


export const getPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.findAll()
        req.json(paymentMethods)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPaymentMethod = async (req, res) => {
    try {
        const {id} = req.params
        const paymentMethod = await PaymentMethod.findOne({
            where: {id}
        })
        if (!paymentMethod) return res.status(404).json({message: 'Payment method not found'})
            
        req.json(paymentMethod)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createPaymentMethods = async (req, res) => {
    const {name, abbreviation, description, status, isActive} = req.body
    try {
        const newPaymentMethod = await PaymentMethod.create({
            name,
            abbreviation,
            description,
            status,
            isActive
        })
        req.json(newPaymentMethod)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updatePaymentMethods = async (req, res) => {
    try {
        const {id} = req.params
        const paymentMethod = await PaymentMethod.findByPk(id)
        paymentMethod.set(req.body)
        await paymentMethod.save()
        return req.json(paymentMethod)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePaymentMethods = async (req, res) => {
    try {
        const {id} = req.params
        await PaymentMethod.destroy({
            where: {id}
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}