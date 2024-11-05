import { Activities } from '../models/Activities.js'
import {Services} from '../models/Services.js'

export const getServices = async (req, res) => {
    try {
        const services = await Services.findAll()
        console.log(services)
        res.json(services)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getService = async (req, res) => {
    try {
        const {id} = req.params
        const service = await Services.findOne({
            where: {
                id
            }
        })
        if(!service) return res.status(404).json({message: 'Service does not exists'})
        res.json(service)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createService = async (req, res) => {
    const {name, description, type, cost, duration, availableFrom, availableTo} = req.body
    try {
        const newServices = await Services.create({
            name, 
            description, 
            type, 
            cost, 
            duration, 
            availableFrom, 
            availableTo
        });
        res.json(newServices)    
    } catch (error) {
        return res.status(500).json({ message: error});
    }
}; 

export const updateService = async (req, res) => {
    try {
        const {id} = req.params
        const {name, description, type, cost, duration, availableFrom, availableTo} = req.body
    
        const services = await Services.findByPk(id)
        services.name = name
        services.description = description
        services.type = type
        services.cost = cost
        services.duration = duration
        services.availableFrom = availableFrom
        services.availableTo = availableTo
        await services.save()
    
        res.json(services)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const deleteService = async (req, res) => {
    try { 
        const { id } = req.params
        await Services.destroy({
            where: {
                id,
            },
        });
        res.status(204).json({message: "Se elimino correctamente"})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getServiceActivites = async (req, res) =>{
    const {id} = req.params
    try {
        const activities = await Activities.findAll({
            where: {serviceId: id}
        })
        res.json(activities);        
    } catch (error) {
        res.status(404).json({message: `No existe la actividad con id = '${id}'`})
    }

}