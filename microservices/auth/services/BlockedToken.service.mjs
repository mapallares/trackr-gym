import Service from './service/Service.mjs'
import BlockedTokenRepository from '../repositories/BlockedToken.repository.mjs'

export class BlockedTokenService extends Service {

    static async findAllBlockedTokens() {
        return await BlockedTokenRepository.findAll()
    }

    static async findAllNamesOfBlockedTokens() {
        const blockedTokens = await BlockedTokenRepository.findAll()
        return blockedTokens ? blockedTokens.map(blockedToken => blockedToken.token) : []
    }

    static async findAllBlockedTokensByUserId(userId) {
        return await BlockedTokenRepository.findAllByUserId(userId)
    }

    static async findAllNamesOfBlockedTokensByUserId(userId) {
        const blockedTokens = await BlockedTokenRepository.findAllByUserId(userId)
        return blockedTokens ? blockedTokens.map(blockedToken => blockedToken.token) : []
    }

    static async existsBlockedTokenByToken(token) {
        const blockedToken = await BlockedTokenRepository.findByToken(token)
        return blockedToken ? true : false
    }

    static async saveToken(token) {
        return await BlockedTokenRepository.save(token)
    }

}

export default BlockedTokenService