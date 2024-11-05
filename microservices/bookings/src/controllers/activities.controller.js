import { Activities } from "../models/Activities.js";
import { Bookings } from "../models/Bookings.js";
import { Services } from "../models/Services.js";


export const getActivities = async (req, res) => {
    try {
        const activities = await Activities.findAll()
        res.json(activities)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
};

export const getActivity = async (req, res) => {
    try {
        const {id} = req.params
        const activity = await Activities.findOne({
            where: {
                id
            }
        })
        if(!activity) return res.status(404).json({message: 'activity does not exists'})
        res.json(activity)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createActivity = async (req, res) => {
    const {id} = req.params
    const {branchId, name, details, type, inCharge, capacity, date, startTime, endTime} = req.body  
    try {
        const service = await Services.findByPk(id)
        if(!service) throw new Error(`No existe el servicio con id = '${id}'`)
        const newActivities = await Activities.create({
            branchId, 
            serviceId: id,
            name,
            details,
            type, 
            inCharge, 
            capacity,
            date,
            startTime,
            endTime
        });
        res.json(newActivities)    
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const updateActivity = async (req, res) => {
    try {
        const {id} = req.params
        const {branchId, name, details, type, inCharge, capacity, date, startTime, endTime} = req.body
    
        const activities = await Activities.findByPk(id)
        activities.branchId = branchId
        activities.name = name 
        activities.details = details
        activities.type = type
        activities.inCharge = inCharge
        activities.capacity = capacity
        activities.date = date
        activities.startTime = startTime
        activities.endTime = endTime
        await activities.save()
    
        res.json(activities)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteActivity = async (req, res) => {
    try { 
        const { id } = req.params
        await Activities.destroy({
            where: {
                id,
            },
        });
        res.status(204).json({message: "Se elimino correctamente"})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getActivityBookings = async (req, res) =>{
    const {id} = req.params
    try {
        const bookings = await Bookings.findAll({
            where: {activityId: id}
        })
        res.json(bookings);    
    } catch (error) {
        res.status(404).json({message: `No existe la actividad con id = '${id}'`})
    }

}