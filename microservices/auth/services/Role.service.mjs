import RoleRepository from '../repositories/Role.repository.mjs'
import IRoleService from './interfaces/IRole.service.mjs'

export class RoleService extends IRoleService {
    
    static async findAllRoles() {
        return await RoleRepository.findAll()
    }

    static async findRoleById(id) {
        return await RoleRepository.findById(id)
    }

    static async findRoleByName(name) {
        return await RoleRepository.findByName(name)
    }

    static async findAllRolesByUserId(userId) {
        return await RoleRepository.findAllByUserId(userId)
    }

    static async saveRole(role) {
        
        try {
            role = await RoleRepository.save(role)
        } catch(error) {
            throw new RoleAlreadyExistError('El rol ya existe')
        }
        
        if(!role) throw new RoleNotFoundError('El rol no ha podido ser creado')

        return role
    }

    static async updateRoleById(id, role) {
        return await RoleRepository.updateById(id, role)
    }

    static async deleteRoleById(id) {
        return await RoleRepository.deleteById(id)
    }

    static async relatePermission(roleId, permissionId) {
        return await RoleRepository.relatePermission(roleId, permissionId)
    }

    static async unrelatePermission(roleId, permissionId) {
        return await RoleRepository.unrelatePermission(roleId, permissionId)
    }

    static async existsPermission(roleId, permissionId) {
        const rolePermission = await RoleRepository.findRolePermission(roleId, permissionId)
        return rolePermission[0] ? true : false
    }

}

export default RoleService