import Service from './service/Service.mjs'

export class IBlockedTokenService extends Service {

    static async findAllBlockedTokens() {
        return super.implements()
    }

    static async findAllNamesOfBlockedTokens() {
        return super.implements()
    }

    static async findAllBlockedTokensByUserId(userId) {
        return super.implements()
    }

    static async findAllNamesOfBlockedTokensByUserId(userId) {
        return super.implements()
    }

    static async existsBlockedTokenByToken(token) {
        return super.implements()
    }

    static async saveToken(token) {
        return super.implements()
    }

}

export default IBlockedTokenService