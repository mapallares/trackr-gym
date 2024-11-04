import express from 'express'
import PlanController from '../controllers/Plan.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const plansRouter = express.Router()

plansRouter.get('/plans', MiddlewareController.verify, PlanController.getAll)
plansRouter.get('/gyms/:gymId/plans', MiddlewareController.verify, PlanController.getAllByGymId)
plansRouter.get('/plans/:id', MiddlewareController.verify, PlanController.getById)
plansRouter.post('/gyms/:gymId/plans', MiddlewareController.verify, PlanController.postOne)
plansRouter.put('/plans/:id', MiddlewareController.verify, PlanController.putById)
plansRouter.delete('/plans/:id', MiddlewareController.verify, PlanController.deleteById)

export default plansRouter