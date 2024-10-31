import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import UserService from '../services/User.service.mjs'
import RoleService from '../services/Role.service.mjs'
import PermissionService from '../services/Permission.service.mjs'
import BlockedTokenService from '../services/BlockedToken.service.mjs'
import { InvalidCredentialsError } from '../errors/error/InvalidCredentials.error.mjs'
import { RegisterInvalidFormatError } from '../errors/error/RegisterInvalidFormat.error.mjs'
import { LoginInvalidFormatError } from '../errors/error/LoginInvalidFormat.error.mjs'
import { UnauthorizedError } from '../errors/error/Unauthorized.error.mjs'
import { ControllerMethodNotImplementedError } from '../errors/error/ControllerMethodNotImplemented.error.mjs'

export class AuthenticationController extends Controller {

    static async register(request, response) {
        super.process(request, response, async () => {
            const { name, username, email, phone, password } = request.body

            Validator.required({ name, username, email, phone, password }, RegisterInvalidFormatError)
            Validator.email({ email })
            Validator.length({ username }, 3, 50)
            Validator.length({ phone }, 5, 100)
            Validator.isStrongPassword({ password })

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await UserService.saveUser({ name, username, email, phone, password: hashedPassword })

            return response.status(201).json(user)
        })
    }

    static async modify(request, response) {
        super.process(request, response, async () => {
            throw new ControllerMethodNotImplementedError('Modulo en construcción')
        })
    }

    static async login(request, response) {
        super.process(request, response, async () => {
            const { username, password } = request.body

            Validator.required({ username, password }, LoginInvalidFormatError)
            Validator.length({ username }, 3, 20)

            const user = await UserService.findUserByUsername(username)

            if (!user) throw new InvalidCredentialsError('El username no corresponde a ningún usuario registrado')
            if(!user.isActive) throw new UnauthorizedError('El usuario ha sido eliminado')
            if (!(await bcrypt.compare(password, user.password))) throw new InvalidCredentialsError('El password no corresponde al username registrado')
            
            const roles = await RoleService.findAllRolesByUserId(user.id)
            const permissions = await PermissionService.findAllPermissionsByUserId(user.id)

            const token = jwt.sign({
              userId: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              roles: roles.map(role => role.name),
              permissions: permissions.map(permission => permission.name),
            }, process.env.JWT_SECRET, { 
                expiresIn: process.env.JWT_EXPIRES_IN 
            })
          
            return response.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            }).status(201).json({ token })
        })
    }

    static async logout(request, response) {
        super.process(request, response, async () => {
            const token = request.headers['authorization']
            
            await BlockedTokenService.saveToken({ token: token, userId: request.user.userId })
            
            return response.clearCookie('access_token').status(200).json({ message: 'El token ha sido bloqueado con éxito' })
        })
    }

}

export default AuthenticationController