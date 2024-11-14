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
import UserDTO from '../dtos/User.dto.mjs'

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

            return response.status(201).json(new UserDTO(user))
        })
    }

    static async modify(request, response) {
        super.process(request, response, async () => {
            const { name, username, email, phone } = request.body

            Validator.required({ name, username, email, phone })
            Validator.email({ email })
            Validator.length({ username }, 3, 50)
            Validator.length({ phone }, 5, 100)

            const user = await UserService.updateUserById(request.user.userId, { name, username, email, phone, updatedAt: 'now()', updatedBy: request.user.name })

            return response.status(200).json(new UserDTO(user))
        })
    }

    static async reset(request, response) {
        super.process(request, response, async () => {
            const { oldPassword, newPassword} = request.body

            Validator.required({ oldPassword, newPassword })
            Validator.isStrongPassword({ newPassword })

            const user = await UserService.findUserById(request.user.userId)
            if (!(await bcrypt.compare(oldPassword, user.password))) throw new InvalidCredentialsError('El password es inconrrecto')

            const hashedPassword = await bcrypt.hash(newPassword, 10)

            await UserService.updateUserById(request.user.userId, { password: hashedPassword, updatedAt: 'now()', updatedBy: request.user.name })

            return response.status(200).json({ message: 'Contraseña cambiada exitosamente'})
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
              phone: user.phone,
              roles: roles.map(role => role.name),
              permissions: permissions.map(permission => permission.name),
            }, process.env.JWT_SECRET, { 
                expiresIn: process.env.JWT_EXPIRES_IN 
            })
          
            return response.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'lax', // Cambiar a strict cuando esté en producción
                maxAge: 1000 * 60 * 60 * 24
            }).status(201).json({ token })
        })
    }

    static async logout(request, response) {
        super.process(request, response, async () => {
            const token = request.headers['authorization'] || request.cookies.access_token
            
            await BlockedTokenService.saveToken({ token: token, userId: request.user.userId })
            response.clearCookie('access_token')
            return response.status(200).json({ message: 'El token ha sido bloqueado con éxito' })
        })
    }

}

export default AuthenticationController