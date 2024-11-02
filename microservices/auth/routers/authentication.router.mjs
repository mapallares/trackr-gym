import express from 'express'
import AuthenticationController from '../controllers/Authentication.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const authenticationRouter = express.Router()

authenticationRouter.post('/register', AuthenticationController.register)
authenticationRouter.put('/modify', MiddlewareController.verify, AuthenticationController.modify)
authenticationRouter.patch('/reset', MiddlewareController.verify, AuthenticationController.reset)
authenticationRouter.post('/login', AuthenticationController.login)
authenticationRouter.post('/logout', MiddlewareController.verify, AuthenticationController.logout)

export default authenticationRouter