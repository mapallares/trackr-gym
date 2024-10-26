import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import PermissionService from '../services/Permission.service.mjs'
import RoleService from '../services/Role.service.mjs'
import { RoleNotFoundError } from '../errors/error/RoleNotFound.error.mjs'
import { PermissionNotFoundError } from '../errors/error/PermissionNotFound.error.mjs'
import { NotFoundError } from '../errors/error/NotFound.error.mjs'

export class PermissionController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const permissions = await PermissionService.findAllPermissions()

            return response.status(200).json(permissions.map(permission => permission.name))
        }, ['Admin'])
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { name, description, type } = request.body

            Validator.required({ name, description, type })
            Validator.length({ name, description }, 2, 500)
            Validator.isIn({ type }, ['Create', 'Read', 'Update', 'Delete'])

            const permission = await PermissionService.savePermission({ name, description, createdBy: request.user.name }, type)
            
            return response.status(201).json(permission)
        }, ['Admin'])
    }

    static async getByName(request, response) {
        super.process(request, response, async () => {
            const { name } = request.params

            const permission = await PermissionService.findPermissionByName(name)
            if (!permission) throw new PermissionNotFoundError(`El permiso ${name} no existe`)
                
            return response.status(200).json(permission)        
        }, ['Admin'])
    }

    static async putByName(request, response) {
        super.process(request, response, async () => {
            const { name, description } = request.body

            Validator.required({ name, description })
            Validator.length({ name, description }, 2, 500)

            const permissionFound = await PermissionService.findPermissionByName(name)
            if (!permissionFound) throw new PermissionNotFoundError(`El permiso ${name} que intenta modificar no existe`)

            const permission = await PermissionService.updatePermissionById(permissionFound.id, { name, description, updatedAt: 'now()', updatedBy: request.user.name })
            
            return response.status(201).json(permission)
        }, ['Admin'])
    }

    static async deleteByName(request, response) {
        super.process(request, response, async () => {
            const { name } = request.params

            Validator.required({ name })
            Validator.length({ name }, 2, 500)

            const permission = await PermissionService.findPermissionByName(name)
            if (!permission) throw new PermissionNotFoundError(`El permiso ${name} no existe`)
            
            try {
                await PermissionService.deletePermissionById(permission.id)
            } catch(error) {
                return response.status(202).json({ message: 'Permiso no puede ser eliminado porque está asignado a roles activos' })
            }

            return response.status(200).json({ message: 'Permiso eliminado con éxito' })        
        }, ['Admin'])
    }

    static async assign(request, response) {
        super.process(request, response, async () => {
            const { permissions, role } = request.body
    
            Validator.required({ permissions, role })
            Validator.isArray({ permissions })
            Validator.length({ role }, 2, 500)
    
            const roleFound = await RoleService.findRoleByName(role)
            if (!roleFound) throw new RoleNotFoundError('El rol al que intenta asignarle permisos no existe')
    
            const permissionsFounds = []
    
            for (const permission of permissions) {
                const permissionFound = await PermissionService.findPermissionByName(permission)
                if (!permissionFound) throw new PermissionNotFoundError(`El permiso ${permission} no existe`)
                permissionsFounds.push(permissionFound)
            }
    
            for (const permissionFound of permissionsFounds) {
                await RoleService.relatePermission(roleFound.id, permissionFound.id)
            }
    
            return response.status(200).json({ message: 'Permisos asignados con éxito' })
        }, ['Admin'])
    }

    static async check(request, response) {
        super.process(request, response, async () => {
            const { permissions, role } = request.body
    
            Validator.required({ permissions, role })
            Validator.isArray({ permissions })
            Validator.length({ role }, 2, 500)
    
            const roleFound = await RoleService.findRoleByName(role)
            if (!roleFound) throw new RoleNotFoundError('El rol al que intenta verificar los permisos no existe')
    
            const permissionsFounds = []
    
            for (const permission of permissions) {
                const permissionFound = await PermissionService.findPermissionByName(permission)
                if (!permissionFound) throw new PermissionNotFoundError(`El permiso ${permission} no existe`)
                permissionsFounds.push(permissionFound)
            }
    
            const checkedPermissions = {}

            for (const permissionFound of permissionsFounds) {
                const exists = await RoleService.existsPermission(roleFound.id, permissionFound.id)
                checkedPermissions[permissionFound.name] = exists
            }

            return response.status(200).json(checkedPermissions)
        }, ['Admin'])
    }

    static async revoke(request, response) {
        super.process(request, response, async () => {
            const { permissions, role } = request.body
    
            Validator.required({ permissions, role })
            Validator.isArray({ permissions })
            Validator.length({ role }, 2, 500)
    
            const roleFound = await RoleService.findRoleByName(role)
            if (!roleFound) throw new RoleNotFoundError('El rol al que intenta asignarle permisos no existe')
    
            const permissionsFounds = []
    
            for (const permission of permissions) {
                const permissionFound = await PermissionService.findPermissionByName(permission)
                if (!permissionFound) throw new PermissionNotFoundError(`El permiso ${permission} no existe`)
                permissionsFounds.push(permissionFound)
            }

            for (const permissionFound of permissionsFounds) {
                const exists = await RoleService.existsPermission(roleFound.id, permissionFound.id)
                if (!exists) throw new NotFoundError(`El rol ${roleFound.name} no tiene el permiso ${permissionFound.name}`)
            }
    
            for (const permissionFound of permissionsFounds) {
                await RoleService.unrelatePermission(roleFound.id, permissionFound.id)
            }
    
            return response.status(200).json({ message: 'Permisos revocados con éxito' })
        }, ['Admin'])
    }

}

export default PermissionController