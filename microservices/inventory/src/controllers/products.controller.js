import { Product } from '../models/Product.js';
import { InvertoryMovement } from '../models/InventoryMovement.js'
import { Detail } from '../models/Detail.js';

export const getProducts = async (req, res) =>{
    try {
        const products = await Product.findAll()
        res.json(products);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id}
        })

        if(!product) return res.status(404).json({message: "Product not found"})

        res.json(product);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createProduct = async (req, res) =>{
    const{name, description, type, purchasePrice, salePrice, stock} = req.body
    try {
        const newProduct = await Product.create({
            name, 
            description, 
            type, 
            purchasePrice, 
            salePrice, 
            stock
        })
        res.json(newProduct);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
        product.set(req.body)
        await product.save()
        return res.json(product);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteProduct =  async (req, res) => {
    try {
        const { id } = req.params
        await Product.destroy({
            where: { id }
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getProductMovements = async (req, res) => {
    try {
        const {id} = req.params
        const movements = await InvertoryMovement.findAll({
            where: { productId : id }
        })
        res.json(movements);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getProductDetails = async (req, res) => {
    try {
        const {id} = req.params
        const details = await Detail.findAll({
            where: { productId : id }
        })
        res.json(details);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}