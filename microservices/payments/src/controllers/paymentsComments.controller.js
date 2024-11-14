import { PaymentComments } from '../models/PaymentComments.js'


export const getPaymentComments = async (req, res) => {
    try {
        const paymentComments = await PaymentComments.findAll()
        req.json(paymentComments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getPaymentComment = async (req, res) => {
    try {
        const {id} = req.params
        const paymentComment = await PaymentComments.findOne({
            where: {id}
        })
        if (!paymentComment) return res.status(404).json({message: 'Payment comment not found'})
            
        req.json(paymentComment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createPaymentComments = async (req, res) => {
    const {paymentId, name, description, date, commenter, isActive, isDeleted} = req.body
    try {
        const newPaymentComment = await PaymentComments.create({
            paymentId,
            name,
            description,
            date,
            commenter,
            isActive,
            isDeleted
        })
        req.json(newPaymentComment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updatePaymentComments = async (req, res) => {
    try {
        const {id} = req.params
        const paymentComment = await PaymentComments.findByPk(id)
        paymentComment.set(req.body)
        await paymentComment.save()
        return req.json(paymentComment)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePaymentComments = async (req, res) => {
    try {
        const {id} = req.params
        await PaymentComments.destroy({
            where: {id}
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}