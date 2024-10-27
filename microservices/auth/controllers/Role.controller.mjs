import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import RoleService from '../services/Role.service.mjs'
import UserService from '../services/User.service.mjs'
import { RoleNotFoundError } from '../errors/error/RoleNotFound.error.mjs'
import { UserNotFoundError } from '../errors/error/UserNotFound.error.mjs'
import { NotFoundError } from '../errors/error/NotFound.error.mjs'

export class RoleController extends Controller {
    
    static async getAll(request, response) {
        super.process(request, response, async () => {
            const roles = await RoleService.findAllRoles()

            return response.status(200).json(roles.map(role => role.name))
        }, ['Admin'])
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { name, description } = request.body

            Validator.required({ name, description })
            Validator.length({ name, description }, 2, 500)

            const role = await RoleService.saveRole({ name, description, createdBy: request.user.name })

            return response.status(201).json(role)
        }, ['Admin'])
    }

    static async getByName(request, response) {
        super.process(request, response, async () => {
            const { name } = request.params

            const role = await RoleService.findRoleByName(name)
            if(!role) throw new RoleNotFoundError(`El rol ${name} no existe`)
            
            return response.status(200).json(role)
        }, ['Admin'])
    }

    static async putByName(request, response) {
        super.process(request, response, async () => {
            const { name, description } = request.body

            Validator.required({ name, description })
            Validator.length({ name, description }, 2, 500)

            const roleFound = await RoleService.findRoleByName(name)
            if (!roleFound) throw new RoleNotFoundError(`El rol ${name} que intenta modificar no existe`)

            const role = await RoleService.updateRoleById(roleFound.id, { name, description, updatedAt: 'now()', updatedBy: request.user.name })
            
            return response.status(201).json(role)        
        })
    }

    static async deleteByName(request, response) {
        super.process(request, response, async () => {
            const { name } = request.params

            Validator.required({ name })
            Validator.length({ name }, 2, 500)

            const role = await RoleService.findRoleByName(name)
            if (!role) throw new RoleNotFoundError(`El role ${name} no existe`)
            
            try {
                await RoleService.deleteRoleById(role.id)
            } catch(error) {
                return response.status(202).json({ message: 'Role no puede ser eliminado porque está asignado a usuarios activos' })
            }

            return response.status(200).json({ message: 'Permiso eliminado con éxito' })        
        }, ['Admin'])
    }

    static async assign(request, response) {
        super.process(request, response, async () => {
            const { roles, username } = request.body
    
            Validator.required({ roles, username })
            Validator.isArray({ roles })
            Validator.length({ username }, 2, 500)
    
            const userFound = await UserService.findUserByUsername(username)
            if (!userFound) throw new UserNotFoundError('El usuario al que intenta asignarle roles no existe')
    
            const rolesFounds = []
    
            for (const role of roles) {
                const roleFound = await RoleService.findRoleByName(role)
                if (!roleFound) throw new RoleNotFoundError(`El rol ${role} no existe`)
                rolesFounds.push(roleFound)
            }
    
            for (const roleFound of rolesFounds) {
                await UserService.relateRole(userFound.id, roleFound.id)
            }
    
            return response.status(200).json({ message: 'Roles asignados con éxito' })
        }, ['Admin'])
    }

    static async check(request, response) {
        super.process(request, response, async () => {
            const { roles, username } = request.body
    
            Validator.required({ roles, username })
            Validator.isArray({ roles })
            Validator.length({ username }, 2, 500)
    
            const userFound = await UserService.findUserByUsername(username)
            if (!userFound) throw new UserNotFoundError('El usuario al que intenta asignarle roles no existe')
    
            const rolesFounds = []
    
            for (const role of roles) {
                const roleFound = await RoleService.findRoleByName(role)
                if (!roleFound) throw new RoleNotFoundError(`El rol ${role} no existe`)
                rolesFounds.push(roleFound)
            }
    
            const checkedRoles = {}

            for (const roleFound of rolesFounds) {
                const exists = await UserService.existsRole(userFound.id, roleFound.id)
                checkedRoles[roleFound.name] = exists
            }

            return response.status(200).json(checkedRoles)
        }, ['Admin'])
    }

    static async revoke(request, response) {
        super.process(request, response, async () => {
            const { roles, username } = request.body
    
            Validator.required({ roles, username })
            Validator.isArray({ roles })
            Validator.length({ username }, 2, 500)
    
            const userFound = await UserService.findUserByUsername(username)
            if (!userFound) throw new UserNotFoundError('El usuario al que intenta asignarle roles no existe')
    
            const rolesFounds = []
    
            for (const role of roles) {
                const roleFound = await RoleService.findRoleByName(role)
                if (!roleFound) throw new RoleNotFoundError(`El rol ${role} no existe`)
                rolesFounds.push(roleFound)
            }
    
            for (const roleFound of rolesFounds) {
                const exists = await UserService.existsRole(userFound.id, roleFound.id)
                if (!exists) throw new NotFoundError(`El usuario ${username} no tiene el rol ${roleFound.name}`)
            }
    
            for (const roleFound of rolesFounds) {
                await UserService.unrelateRole(userFound.id, roleFound.id)
            }
    
            return response.status(200).json({ message: 'Roles revocados con éxito' })
        }, ['Admin'])
    }

}

export default RoleController