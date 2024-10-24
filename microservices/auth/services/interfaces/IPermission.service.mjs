import Service from './service/Service.mjs'

export class IPermissionService extends Service {

    static async findAllPermissions() {
        return super.implements()
    }

    static async findPermissionById(id) {
        return super.implements()
    }

    static async findPermissionByName(name) {
        return super.implements()
    }

    static async findAllPermissionsByUserId(userId) {
        return super.implements()
    }

    static async savePermission(permission, typeName) {
        return super.implements()
    }

    static async updatePermissionById(id, permission) {
        return super.implements()
    }

    static async deletePermissionById(id) {
        return super.implements()
    }
    
}

export default IPermissionService