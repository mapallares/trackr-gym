import Service from './service/Service.mjs'

export class IRoleService extends Service {

    static async findAllRoles() {
        return super.implements()
    }

    static async findRoleById(id) {
        return super.implements()
    }

    static async findRoleByName(name) {
        return super.implements()
    }

    static async findAllRolesByUserId(userId) {
        return super.implements()
    }

    static async saveRole(role) {
        return super.implements()
    }

    static async relatePermission(roleId, permissionId) {
        return super.implements()
    }

    static async unrelatePermission(roleId, permissionId) {
        return super.implements()
    }

    static async existsPermission(roleId, permissionId) {
        return super.implements()
    }
    
}

export default IRoleService