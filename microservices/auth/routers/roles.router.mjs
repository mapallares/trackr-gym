import express from 'express'
import RoleController from '../controllers/Role.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const rolesRouter = express.Router()

rolesRouter.get('/roles', MiddlewareController.verify, RoleController.getAll)
rolesRouter.post('/roles', MiddlewareController.verify, RoleController.postOne)
rolesRouter.get('/roles/:name', MiddlewareController.verify, RoleController.getByName)
rolesRouter.put('/roles/:name', MiddlewareController.verify, RoleController.putByName)
rolesRouter.delete('/roles/:name', MiddlewareController.verify, RoleController.deleteByName)
rolesRouter.post('/assign/roles', MiddlewareController.verify, RoleController.assign)
rolesRouter.get('/check/roles', MiddlewareController.verify, RoleController.check)
rolesRouter.delete('/revoke/roles', MiddlewareController.verify, RoleController.revoke)

export default rolesRouter