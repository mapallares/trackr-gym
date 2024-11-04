import express from 'express'
import BenefitController from '../controllers/Benefit.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const benefitsRouter = express.Router()

benefitsRouter.get('/benefits', MiddlewareController.verify, BenefitController.getAll)
benefitsRouter.get('/gyms/:gymId/benefits', MiddlewareController.verify, BenefitController.getAllByGymId)
benefitsRouter.get('/benefits/:id', MiddlewareController.verify, BenefitController.getById)
benefitsRouter.post('/gyms/:gymId/benefits', MiddlewareController.verify, BenefitController.postOne)
benefitsRouter.put('/benefits/:id', MiddlewareController.verify, BenefitController.putById)
benefitsRouter.delete('/benefits/:id', MiddlewareController.verify, BenefitController.deleteById)

benefitsRouter.get('/plans/:planId/benefits/', MiddlewareController.verify, BenefitController.getAllByPlanId)
benefitsRouter.post('/plans/:planId/benefits/:id', MiddlewareController.verify, BenefitController.assignByPlanId)
benefitsRouter.put('/plans/:planId/benefits/:id', MiddlewareController.verify, BenefitController.modifyAssignmentByPlanId)
benefitsRouter.delete('/plans/:planId/benefits/:id', MiddlewareController.verify, BenefitController.revokeByPlanId)

export default benefitsRouter