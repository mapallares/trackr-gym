import { Attendances } from "../models/Attendances.js";
import { Bookings } from "../models/Bookings.js";

export const getAttendances = async (req, res) => {
    try {
        const attendances = await Attendances.findAll()
        res.json(attendances)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
};

export const getAttendance = async (req, res) => {
    try {
        const {id} = req.params
        const attendance = await Attendances.findOne({
            where: {
                id
            }
        })
        if(!attendance) return res.status(404).json({message: 'attendance does not exists'})
        res.json(attendance)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createAttendance = async (req, res) => {
    const {id} = req.params
    const {userId, date, arrivalTime, departureTime, comments} = req.body  
    try {
        const booking = await Bookings.findByPk(id)
        if(!booking) throw new Error(`No existe la reserva con id = '${id}'`)
        const newAttendances = await Attendances.create({
            userId, 
            bookingId: id,
            date, 
            arrivalTime, 
            departureTime, 
            comments
        });
        res.json(newAttendances)    
    } catch (error) {
        return res.status(404).json({ message: error });
    }
};

export const updateAttendance = async (req, res) => {
    try {
        const {id} = req.params
        const {userId, date, arrivalTime, departureTime, comments} = req.body
    
        const attendances = await Attendances.findByPk(id)
        attendances.userId = userId
        attendances.date = date
        attendances.arrivalTime = arrivalTime
        attendances.departureTime = departureTime
        attendances.comments = comments
        await attendances.save()
    
        res.json(attendances)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

export const deleteAttendance = async (req, res) => {
    try { 
        const { id } = req.params
        await Attendances.destroy({
            where: {
                id,
            },
        });
        res.status(204).json({message: "Se elimino correctamente"})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};
