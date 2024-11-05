import {Detail} from '../models/Detail.js'

export const getDetails = async (req, res) =>{
    try {
        const details = await Detail.findAll()
        res.json(details);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getDetail = async (req, res) => {
    try {
        const {id} = req.params
        const detail = await Detail.findOne({
            where: {id}
        })

        if(!detail) return res.status(404).json({message: "Detail not found"})

        res.json(detail);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createDetail = async (req, res) =>{
    const{key,value,type,isVisible,productId} = req.body
    try {
        const newDetail = await Detail.create({
            key,
            value,
            type,
            isVisible,
            productId
        })
        res.json(newDetail);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const updateDetail = async (req, res) =>{
    try {
        const {id} = req.params
        const detail = await Detail.findByPk(id)
        detail.set(req.body)
        await detail.save()
        return res.json(detail)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const deleteDetail =  async (req, res) => {
    try {
        const { id } = req.params
        await Detail.destroy({
            where: { id }
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}