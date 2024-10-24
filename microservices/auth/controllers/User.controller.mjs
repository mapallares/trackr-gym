import bcrypt from 'bcryptjs'
import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import UserService from '../services/User.service.mjs'
import { UserNotFoundError } from '../errors/error/UserNotFound.error.mjs'
import { ControllerMethodNotImplementedError } from '../errors/error/ControllerMethodNotImplemented.error.mjs'

export class UserController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const users = await UserService.findAllUsers()
            return response.status(200).json(users)
        }, ['Admin'])
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {            
            const { name, username, email, password, role } = request.body

            Validator.required({ name, username, email, password, role })
            Validator.email({ email })
            Validator.length({ username }, 3, 20)
            Validator.isStrongPassword({ password })

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await UserService.saveUser({ name, username, email, password: hashedPassword, createdBy: request.user.name, updatedBy: request.user.name }, role)

            return response.status(201).json(user)
        }, ['Admin'])
    }

    static async putByUsername(request, response) {
        super.process(request, response, async () => {
            const { username } = request.params

            Validator.required({ username })

            throw new ControllerMethodNotImplementedError('Modulo en construcción')

            return response.status(200).json(request.user.name + ' ha modificado a un usuario en el sistema con el username = ' + username)
        }, ['Admin'])
    }

    static async deleteByUsername(request, response) {
        super.process(request, response, async () => {
            const { username } = request.params

            Validator.required({ username })

            const user = await UserService.updateUserByUsername(username, { status: 'Deleted', isActive: false, updatedBy: request.user.name })

            if(!user) throw new UserNotFoundError(`No existe un usuario con username = '${username}'`)

            return response.status(200).json({ message: `El usuario con username = '${username}' ha sido eliminado con éxito` })
        }, ['Admin'])
    }

}

export default UserController