import express from 'express'
import PermissionController from '../controllers/Permission.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const permissionsRouter = express.Router()

permissionsRouter.get('/permissions', MiddlewareController.verify, PermissionController.getAll)
permissionsRouter.post('/permissions', MiddlewareController.verify, PermissionController.postOne)
permissionsRouter.get('/permissions/:name', MiddlewareController.verify, PermissionController.getByName)
permissionsRouter.put('/permissions/:name', MiddlewareController.verify, PermissionController.putByName)
permissionsRouter.delete('/permissions/:name', MiddlewareController.verify, PermissionController.deleteByName)
permissionsRouter.post('/assign/permissions', MiddlewareController.verify, PermissionController.assign)
permissionsRouter.get('/check/permissions', MiddlewareController.verify, PermissionController.check)
permissionsRouter.delete('/revoke/permissions', MiddlewareController.verify, PermissionController.revoke)


export default permissionsRouter