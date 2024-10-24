import Permission from '../entities/Permission.entity.mjs'
import Repository from './repository/Repository.mjs'

export class PermissionRepository extends Repository {

    static async findAll() {
        return await super.findAll(Permission)
    }
    
    static async findById(id) {
        return await super.findById(Permission, id)
    }
    
    static async findByName(name) {
        return await super.findByColumn(Permission, { name })
    }

    static async findAllByUserId(userId) {
        return await super.find(`SELECT p."name" 
            FROM "Users" u 
            INNER JOIN "UsersRoles" ur 
            ON u."id" = ur."userId" 
            INNER JOIN "Roles" r 
            ON r."id" = ur."roleId" 
            INNER JOIN "RolesPermissions" rp 
            ON rp."roleId" = r."id" 
            INNER JOIN "Permissions" p 
            ON p."id" = rp."permissionId" 
            WHERE ur."userId" = '${userId}'`)
    }

    static async save(permission, typeName) {
        const type = await super.find(`SELECT * FROM "Types" WHERE "name" = '${typeName}'`)
        permission['typeId'] = type[0].id || null
        return await super.saveAll(Permission, permission)
    }

    static async updateById(id, permission) {
        return await super.updateById(Permission, id, permission)
    }

    static async deleteById(id) {
        return await super.deleteById(Permission, id)
    }

}

export default PermissionRepository