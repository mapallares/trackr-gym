import express from 'express'
import BranchController from '../controllers/Branch.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const branchesRouter = express.Router()

branchesRouter.get('/branches', MiddlewareController.verify, BranchController.getAll)
branchesRouter.get('/gyms/:gymId/branches', MiddlewareController.verify, BranchController.getAllByGymId)
branchesRouter.get('/branches/:id', MiddlewareController.verify, BranchController.getById)
branchesRouter.post('/gyms/:gymId/branches', MiddlewareController.verify, BranchController.postOne)
branchesRouter.put('/branches/:id', MiddlewareController.verify, BranchController.putById)
branchesRouter.delete('/branches/:id', MiddlewareController.verify, BranchController.deleteById)

branchesRouter.get('/plans/:planId/branches', MiddlewareController.verify, BranchController.getAllByPlanId)
branchesRouter.post('/plans/:planId/branches/:id', MiddlewareController.verify, BranchController.assignByPlanId)
branchesRouter.delete('/plans/:planId/branches/:id', MiddlewareController.verify, BranchController.revokeByPlanId)

export default branchesRouter