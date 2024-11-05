import { Router } from "express";
import {getAttendances, createAttendance, updateAttendance, deleteAttendance, getAttendance} from '../controllers/attendances.controller.js'

const router = Router();

router.get('/attendances', getAttendances)
router.post('/bookings/:id/attendances', createAttendance)
router.put('/attendances/:id', updateAttendance)  
router.delete('/attendances/:id', deleteAttendance)  
router.get('/attendances/:id', getAttendance)

export default router;
