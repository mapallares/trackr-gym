import UserRepository from '../repositories/User.repository.mjs'
import RoleRepository from '../repositories/Role.repository.mjs'
import IUserService from './interfaces/IUser.service.mjs'
import { UserNotFoundError } from '../errors/error/UserNotFound.error.mjs'
import { UserAlreadyExistError } from '../errors/error/UserAlreadyExist.error.mjs'
import { RoleNotFoundError } from '../errors/error/RoleNotFound.error.mjs'

export class UserService extends IUserService {
    
    static async findAllUsers() {
        return await UserRepository.findAll()
    }

    static async findUserById(id) {
        return await UserRepository.findById(id)
    }

    static async findUserByUsername(username) {
        return await UserRepository.findByUsername(username)
    }

    static async findUserFullByUsername(username) {
        return await UserRepository.findFullByUsername(username)
    }

    static async saveUser(user, roleName = 'User') {
        const role = await RoleRepository.findByName(roleName)

        if(!role) throw new RoleNotFoundError('El role no está disponible')

        try {
            user = await UserRepository.save(user)
        } catch(error) {
            throw new UserAlreadyExistError('Las credenciales han sido usadas')
        }
        
        if(!user) throw new UserNotFoundError('El usuario no ha podido ser creado')

        await UserRepository.relateRole(user.id, role.id)
        return user
    }

    static async updateUserByUsername(username, user) {
        return await UserRepository.updateByUsername(username, user)
    }

    static async relateRole(userId, roleId) {
        return await UserRepository.relateRole(userId, roleId)
    }

    static async unrelateRole(userId, roleId) {
        return await UserRepository.unrelateRole(userId, roleId)
    }
    
    static async existsRole(userId, roleId) {
        const userRole = await UserRepository.findUserRole(userId, roleId)
        return userRole[0] ? true : false
    }

}

export default UserService