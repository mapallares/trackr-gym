import express from 'express'
import NetworkController from '../controllers/Network.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const networksRouter = express.Router()

networksRouter.get('/networks', MiddlewareController.verify, NetworkController.getAll)
networksRouter.get('/gyms/:gymId/networks', MiddlewareController.verify, NetworkController.getAllByGymId)
networksRouter.get('/networks/:id', MiddlewareController.verify, NetworkController.getById)
networksRouter.post('/gyms/:gymId/networks', MiddlewareController.verify, NetworkController.postOne)
networksRouter.put('/networks/:id', MiddlewareController.verify, NetworkController.putById)
networksRouter.delete('/networks/:id', MiddlewareController.verify, NetworkController.deleteById)

export default networksRouter
