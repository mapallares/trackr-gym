import bcrypt from 'bcryptjs'
import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import UserService from '../services/User.service.mjs'
import { UserNotFoundError } from '../errors/error/UserNotFound.error.mjs'
import UserDTO from '../dtos/User.dto.mjs'

export class UserController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const users = await UserService.findAllUsers()
            return response.status(200).json(users.map(user => new UserDTO(user)))
        }, ['Admin'])
    }

    static async getByUsername(request, response) {
        super.process(request, response, async () => {
            const { username } = request.params

            Validator.required({ username })

            const user = await UserService.findUserByUsername(username)

            if(!user) throw new UserNotFoundError(`No existe un usuario con username = '${username}'`)

            return response.status(200).json(new UserDTO(user))
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

            return response.status(201).json(new UserDTO(user))
        }, ['Admin'])
    }

    static async putByUsername(request, response) {
        super.process(request, response, async () => {
            const userName = request.params.username
            const { name, username, email, phone, password } = request.body

            Validator.required({ name, username, email, phone, password })
            Validator.email({ email })
            Validator.length({ username }, 3, 50)
            Validator.length({ phone }, 5, 100)
            Validator.isStrongPassword({ password })

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await UserService.updateUserByUsername(userName, { name, username, email, phone, password: hashedPassword, updatedAt: 'now()', updatedBy: request.user.name })

            if(!user) throw new UserNotFoundError(`No existe un usuario con username = '${username}'`)

            return response.status(200).json(new UserDTO(user))
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