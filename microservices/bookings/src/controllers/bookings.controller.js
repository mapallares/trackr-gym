import { Activities } from '../models/Activities.js'
import { Attendances } from '../models/Attendances.js'
import {Bookings} from '../models/Bookings.js'

export const getBookings = async (req, res) => {
    try {
        const bookings = await Bookings.findAll()
        console.log(bookings)
        res.json(bookings)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const getBooking = async (req, res) => {
    try {
        const {id} = req.params
        const booking = await Bookings.findOne({
            where: {
                id
            }
        })
        if(!booking) return res.status(404).json({message: 'Booking does not exists'})
        res.json(booking)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createBooking = async (req, res) => {
    const {id} = req.params
    const {userId, branchId, date, startTime, endTime, reason} = req.body
    
    try {
        const activity = await Activities.findByPk(id)
        if(!activity) throw new Error(`No existe la actividad con id = '${id}'`)
        const newBookings = await Bookings.create({
            userId,
            activityId: id, 
            branchId,
            date,
            startTime, 
            endTime, 
            reason
        });
        res.json(newBookings)    
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};  

export const updateBooking = async (req, res) => {
    try {
        const {id} = req.params
        const {userId, branchId, date, startTime, endTime, reason, isApproved, isCancelled} = req.body
    
        const bookings = await Bookings.findByPk(id)
        bookings.userId = userId
        bookings.branchId = branchId
        bookings.date = date
        bookings.startTime = startTime
        bookings.endTime = endTime
        bookings.reason = reason
        bookings.isApproved = isApproved
        bookings.isCancelled = isCancelled
        await bookings.save()
    
        res.json(bookings)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}


export const deleteBooking = async (req, res) => {
    try { 
        const { id } = req.params
        await Bookings.destroy({
            where: {
                id,
            },
        });
        res.status(204).json({message: "Se elimino correctamente"})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getBookingAttendances = async (req, res) =>{
    const {id} = req.params
    try {
        const attendances = await Attendances.findAll({
            where: {bookingId: id}
        })
        res.json(attendances); 
    } catch (error) {
        res.status(404).json({message: `No existe la reserva con id = '${id}'`})
    }

}