import express from 'express'
import AuthorizationController from '../controllers/Authorization.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const authorizationRouter = express.Router()

authorizationRouter.get('/session', MiddlewareController.verify, AuthorizationController.session)
authorizationRouter.get('/session/roles', MiddlewareController.verify, AuthorizationController.roles)
authorizationRouter.get('/session/permissions', MiddlewareController.verify, AuthorizationController.permissions)

export default authorizationRouter