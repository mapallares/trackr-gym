import express from 'express'
import UserController from '../controllers/User.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const usersRouter = express.Router()

usersRouter.get('/users', MiddlewareController.verify, UserController.getAll)
usersRouter.get('/users/:username', MiddlewareController.verify, UserController.getByUsername)
usersRouter.post('/users', MiddlewareController.verify, UserController.postOne)
usersRouter.put('/users/:username', MiddlewareController.verify, UserController.putByUsername)
usersRouter.delete('/users/:username', MiddlewareController.verify, UserController.deleteByUsername)

export default usersRouter