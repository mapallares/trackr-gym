import express from 'express'
import RoleController from '../controllers/Role.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const rolesRouter = express.Router()

rolesRouter.get('/roles', MiddlewareController.verify, RoleController.getAll)
rolesRouter.post('/roles', MiddlewareController.verify, RoleController.postOne)
rolesRouter.get('/roles/:name', MiddlewareController.verify, RoleController.getByName)
rolesRouter.put('/roles/:name', MiddlewareController.verify, RoleController.putByName)
rolesRouter.delete('/roles/:name', MiddlewareController.verify, RoleController.deleteByName)
rolesRouter.post('/roles-assign', MiddlewareController.verify, RoleController.assign)
rolesRouter.get('/roles-check', MiddlewareController.verify, RoleController.check)
rolesRouter.delete('/roles-revoke', MiddlewareController.verify, RoleController.revoke)

export default rolesRouter