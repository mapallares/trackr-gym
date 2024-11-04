import express from 'express'
import GymController from '../controllers/Gym.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const gymsRouter = express.Router()

gymsRouter.get('/gyms', MiddlewareController.verify, GymController.getAll)
gymsRouter.get('/gyms/:id', MiddlewareController.verify, GymController.getById)
gymsRouter.post('/gyms', MiddlewareController.verify, GymController.postOne)
gymsRouter.put('/gyms/:id', MiddlewareController.verify, GymController.putById)
gymsRouter.delete('/gyms/:id', MiddlewareController.verify, GymController.deleteById)

export default gymsRouter