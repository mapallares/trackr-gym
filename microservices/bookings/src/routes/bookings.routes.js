import {Router} from 'express'
import {createBooking, deleteBooking, getBooking, getBookings, updateBooking, getBookingAttendances} from '../controllers/bookings.controller.js'

const router = Router()

router.get('/bookings', getBookings)
router.post('/activities/:id/bookings', createBooking)
router.put('/bookings/:id', updateBooking)  
router.delete('/bookings/:id', deleteBooking)  
router.get('/bookings/:id', getBooking)
router.get('/bookings/:id/attendances', getBookingAttendances)

export default router;