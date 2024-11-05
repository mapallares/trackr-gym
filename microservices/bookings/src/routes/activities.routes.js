import { Router } from "express"
import {getActivities, createActivity, updateActivity, deleteActivity, getActivity, getActivityBookings} from '../controllers/activities.controller.js'

const router = Router()

router.get('/activities', getActivities)
router.post('/services/:id/activities', createActivity)
router.put('/activities/:id', updateActivity)  
router.delete('/activities/:id', deleteActivity)  
router.get('/activities/:id', getActivity)
router.get('/activities/:id/bookings', getActivityBookings)

export default router