import express from 'express'
import ScheduleController from '../controllers/Schedule.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const schedulesRouter = express.Router()

schedulesRouter.get('/schedules', MiddlewareController.verify, ScheduleController.getAll)
schedulesRouter.get('/branches/:branchId/schedules', MiddlewareController.verify, ScheduleController.getAllByBranchId)
schedulesRouter.get('/schedules/:id', MiddlewareController.verify, ScheduleController.getById)
schedulesRouter.post('/branches/:branchId/schedules', MiddlewareController.verify, ScheduleController.postOne)
schedulesRouter.put('schedules/:id', MiddlewareController.verify, ScheduleController.putById)
schedulesRouter.delete('schedules/:id', MiddlewareController.verify, ScheduleController.deleteById)

export default schedulesRouter