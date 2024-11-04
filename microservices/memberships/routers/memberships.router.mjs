import express from 'express'
import MembershipController from '../controllers/Membership.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const membershipsRouter = express.Router()

membershipsRouter.get('/', (request, response) => {
    response.send('TrackrGym Memberships Microservice')
})

membershipsRouter.get('/all', MiddlewareController.verify, MembershipController.getAll)
membershipsRouter.get('/all/:id', MiddlewareController.verify, MembershipController.getById)
membershipsRouter.get('/activated', MiddlewareController.verify, MembershipController.getAllActivated)
membershipsRouter.get('/expired', MiddlewareController.verify, MembershipController.getAllExpired)
membershipsRouter.get('/suspended', MiddlewareController.verify, MembershipController.getAllSuspended)
membershipsRouter.get('/cancelled', MiddlewareController.verify, MembershipController.getAllCancelled)
membershipsRouter.get('/deleted', MiddlewareController.verify, MembershipController.getAllDeleted)
membershipsRouter.get('/renewed', MiddlewareController.verify, MembershipController.getAllRenewed)

membershipsRouter.post('/new/:planId', MiddlewareController.verify, MembershipController.postNewByPlanId)
membershipsRouter.patch('/renew/:id', MiddlewareController.verify, MembershipController.patchRenewById)
membershipsRouter.patch('/cancel/:id', MiddlewareController.verify, MembershipController.patchCancelById)
membershipsRouter.put('/modify/:id', MiddlewareController.verify, MembershipController.putById)
membershipsRouter.delete('/delete/:id', MiddlewareController.verify, MembershipController.deleteById)

membershipsRouter.get('/:id/users', MiddlewareController.verify, MembershipController.getAllUsersMembershipsById)
membershipsRouter.post('/:id/users/:userId', MiddlewareController.verify, MembershipController.assignByUserId)
membershipsRouter.delete('/:id/users/:userId', MiddlewareController.verify, MembershipController.revokeByUserId)
membershipsRouter.get('/users/:userId', MiddlewareController.verify, MembershipController.getAllByUserId)

export default membershipsRouter