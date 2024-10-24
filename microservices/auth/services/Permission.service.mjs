import { PermissionAlreadyExistError } from '../errors/error/PermissionAlreadyExist.error.mjs'
import { PermissionNotFoundError } from '../errors/error/PermissionNotFound.error.mjs'
import PermissionRepository from '../repositories/Permission.repository.mjs'
import IPermissionService from './interfaces/IPermission.service.mjs'

export class PermissionService extends IPermissionService {
    
    static async findAllPermissions() {
        return await PermissionRepository.findAll()
    }

    static async findPermissionById(id) {
        return await PermissionRepository.findById(id)
    }

    static async findPermissionByName(name) {
        return await PermissionRepository.findByName(name)
    }

    static async findAllPermissionsByUserId(userId) {
        return await PermissionRepository.findAllByUserId(userId)
    }

    static async savePermission(permission, typeName) {
        
        try {
            permission = await PermissionRepository.save(permission, typeName)
        } catch(error) {
            throw new PermissionAlreadyExistError('El permiso ya existe')
        }
        
        if(!permission) throw new PermissionNotFoundError('El permiso no ha podido ser creado')

        return permission
    }

    static async updatePermissionById(id, permission) {
        return await PermissionRepository.updateById(id, permission)
    }

    static async deletePermissionById(id) {
        return await PermissionRepository.deleteById(id)
    }

}

export default PermissionService