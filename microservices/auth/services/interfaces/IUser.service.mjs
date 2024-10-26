import Service from './service/Service.mjs'

export class IUserService extends Service {

    static async findAllUsers() {
        return super.implements()
    }

    static async findUserById(id) {
        return super.implements()
    }

    static async findUserByUsername(username) {
        return super.implements()
    }

    static async findUserFullByUsername(username) {
        return super.implements()
    }

    static async saveUser(user) {
        return super.implements()
    }

    static async updateUserByUsername(username, user) {
        return super.implements()
    }

    static async relateRole(userId, roleId) {
        return super.implements()
    }

    static async unrelateRole(userId, roleId) {
        return super.implements()
    }

    static async existsRole(userId, roleId) {
        return super.implements()
    }

}

export default IUserService