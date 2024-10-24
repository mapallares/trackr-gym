import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import RoleService from '../services/Role.service.mjs'
import { ControllerMethodNotImplementedError } from '../errors/error/ControllerMethodNotImplemented.error.mjs'

export class RoleController extends Controller {
    
    static async getAll(request, response) {
        super.process(request, response, async () => {
            const roles = await RoleService.findAllRoles()
            return response.status(200).json(roles.map(role => role.name))
        })
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { name, description } = request.body

            Validator.required({ name, description })
            Validator.length({ name, description }, 2, 500)

            const role = await RoleService.saveRole({ name, description, createdBy: request.user.name, updatedBy: request.user.name })
            
            return response.status(201).json(role)
        })
    }

    static async getByName(request, response) {
        super.process(request, response, async () => {
            const { name } = request.params
            const role = await RoleService.findRoleByName(name)
            return response.status(200).json(role)        })
    }

    static async putByName(request, response) {
        super.process(request, response, () => {
            throw new ControllerMethodNotImplementedError('Modulo en construcción')
        })
    }

    static async deleteByName(request, response) {
        super.process(request, response, () => {
            throw new ControllerMethodNotImplementedError('Modulo en construcción')
        })
    }

    static async assign(request, response) {
        super.process(request, response, () => {
            throw new ControllerMethodNotImplementedError('Modulo en construcción')
        })
    }

    static async check(request, response) {
        super.process(request, response, () => {
            throw new ControllerMethodNotImplementedError('Modulo en construcción')
        })
    }

    static async revoke(request, response) {
        super.process(request, response, () => {
            throw new ControllerMethodNotImplementedError('Modulo en construcción')
        })
    }

}

export default RoleController