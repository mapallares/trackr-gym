import Role from '../entities/Role.entity.mjs'
import Repository from './repository/Repository.mjs'

export class RoleRepository extends Repository {

    static async findAll() {
        return await super.findAll(Role)
    }
    
    static async findById(id) {
        return await super.findById(Role, id)
    }

    static async findByName(name) {
        return await super.findByColumn(Role, { name })
    }

    static async findAllByUserId(userId) {
        return await super.find(`SELECT r."name" 
            FROM "Users" u 
            INNER JOIN "UsersRoles" ur 
            ON u."id" = ur."userId" 
            INNER JOIN "Roles" r 
            ON r."id" = ur."roleId" 
            WHERE ur."userId" = '${userId}'`)
    }

    static async save(role) {
        return await super.saveAll(Role, role)
    }

    static async updateById(id, role) {
        return await super.updateById(Role, id, role)
    }

    static async deleteById(id) {
        return await super.deleteById(Role, id)
    }

    static async relatePermission(roleId, permissionId) {
        return await super.save(`INSERT INTO "RolesPermissions" 
            ("roleId", "permissionId") 
            VALUES ('${roleId}', '${permissionId}') 
            RETURNING *`)
    }

    static async unrelatePermission(roleId, permissionId) {
        return await super.find(`DELETE FROM "RolesPermissions" 
            WHERE "roleId" = '${roleId}' 
            AND "permissionId" = '${permissionId}'`)
    }

    static async findRolePermission(roleId, permissionId) {
        return await super.find(`SELECT * 
            FROM "RolesPermissions" 
            WHERE "roleId" = '${roleId}' 
            AND "permissionId" = '${permissionId}'`)
    }

}

export default RoleRepository