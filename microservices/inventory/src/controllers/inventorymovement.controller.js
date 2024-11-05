import {InvertoryMovement} from '../models/InventoryMovement.js'

export const getInventoryMovements = async (req, res) =>{
    try {
        const inventoryMovements = await InvertoryMovement.findAll()
        res.json(inventoryMovements);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getInventoryMovement = async (req, res) =>{
    try {
        const {id} = req.params
        const inventoryMovement = await InvertoryMovement.findOne({
            where: {id}
        })
        if(!inventoryMovement) return res.status(404).json({message: "Inventory Movement not found"})
        res.json(inventoryMovement)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createInventoryMovement = async (req, res) =>{
    const{type,quantity,description,paymentId,productId} = req.body
    try {
        const newMovement = await InvertoryMovement.create({
            type, 
            quantity, 
            description,
            paymentId,
            productId
        })
        res.json(newMovement)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const updateInventoryMovement = async (req, res) =>{
    try {
        const {id} = req.params
        const movement = await InvertoryMovement.findByPk(id)
        movement.set(req.body)
        await movement.save()
        return res.json(movement)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteInventoryMovement = async (req, res) =>{
    try {
        const {id} = req.params
        await InvertoryMovement.destroy({
            where: {id}
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}