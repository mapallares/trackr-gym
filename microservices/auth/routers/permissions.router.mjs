import express from 'express'
import PermissionController from '../controllers/Permission.controller.mjs'
import MiddlewareController from '../controllers/Middleware.controller.mjs'

const permissionsRouter = express.Router()

permissionsRouter.get('/permissions', MiddlewareController.verify, PermissionController.getAll)
permissionsRouter.post('/permissions', MiddlewareController.verify, PermissionController.postOne)
permissionsRouter.get('/permissions/:name', MiddlewareController.verify, PermissionController.getByName)
permissionsRouter.put('/permissions/:name', MiddlewareController.verify, PermissionController.putByName)
permissionsRouter.delete('/permissions/:name', MiddlewareController.verify, PermissionController.deleteByName)
permissionsRouter.post('/permissions-assign', MiddlewareController.verify, PermissionController.assign)
permissionsRouter.get('/permissions-check', MiddlewareController.verify, PermissionController.check)
permissionsRouter.delete('/permissions-revoke', MiddlewareController.verify, PermissionController.revoke)


export default permissionsRouter