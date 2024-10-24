import BlockedToken from '../entities/BlockedToken.entity.mjs'
import Repository from './repository/Repository.mjs'

export class BlockedTokenRepository extends Repository {

    static async findAll() {
        return await super.findAll(BlockedToken)
    }

    static async findByUserId(userId) {
        return await super.findByColumn(BlockedToken, { userId })
    }
    
    static async findByToken(token) {
        return await super.findByColumn(BlockedToken, { token })
    }

    static async save(token) {
        return await super.save(BlockedToken, token)
    }

}

export default BlockedTokenRepository