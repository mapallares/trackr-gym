import User from '../entities/User.entity.mjs'
import Repository from './repository/Repository.mjs'

export class UserRepository extends Repository {

    static async findAll() {
        return await super.findAll(User)
    }
    
    static async findById(id) {
        return await super.findById(User, id)
    }

    static async findByUsername(username) {
        return await super.findByColumn(User, { username })
    }

    static async findFullByUsername(username) {
        const user = await super.read(`SELECT u.*, array_agg(r."name") as roles, array_agg(p."name") as permissions
            FROM "Users" u
            LEFT JOIN "UsersRoles" ur ON u."id" = ur."userId"
            LEFT JOIN "Roles" r ON ur."roleId" = r."id"
            LEFT JOIN "RolesPermissions" rp ON r."id" = rp."roleId"
            LEFT JOIN "Permissions" p ON rp."permissionId" = p."id"
            WHERE u."username" = '${username}'
            GROUP BY u."id"`) || null
            return user ? user[0] || null : undefined
    }

    static async save(user) {
        return await super.saveAll(User, user)
    }

    static async relateRole(userId, roleId) {
        return await super.save(`INSERT INTO "UsersRoles" 
            ("userId", "roleId") 
            VALUES ('${userId}', '${roleId}') 
            RETURNING *`)
    }

    static async unrelateRole(userId, roleId) {
        return await super.find(`DELETE FROM "UsersRoles" 
            WHERE "userId" = '${userId}' 
            AND "roleId" = '${roleId}'`)
    }

    static async updateByUsername(username, user) {
        return await super.updateByColumn(User, { username }, user)
    }
    
    static async findUserRole(userId, roleId) {
        return await super.find(`SELECT * 
            FROM "UsersRoles" 
            WHERE "userId" = '${userId}' 
            AND "roleId" = '${roleId}'`)
    }

}

export default UserRepository