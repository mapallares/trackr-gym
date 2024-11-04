import Membership from '../entities/Membership.entity.mjs'
import Repository from './repository/Repository.mjs'

export class MembershipRepository extends Repository {

    static async findAll() {
        return super.findAll(Membership)
    }

    static async findAllByGymId(gymId) {
        return await super.findAllByColumn(Membership, { gymId })
    }

    static async findAllByUserId(userId) {
        return await super.findAllByColumn(Membership, { userId })
    }

    static async findAllUsersMembershipsById(id) {
        return await super.find(`SELECT UM."userId", 
            UM."membershipId",
            M."status",
            M."isActive",
            M."isCancelled",
            M."wasRenewed"
            FROM "Memberships" AS M
            INNER JOIN "UsersMemberships" AS UM
            ON M."id" = UM."membershipId"
            WHERE UM."membershipId" = '${id}'`)
    }

    static async findById(id) {
        return await super.findById(Membership, id)
    }

    static async save(membership) {
        return await super.saveAll(Membership, membership)
    }

    static async updateById(id, membership) {
        return await super.updateById(Membership, id, membership)
    }

    static async deleteById(id) {
        return await super.deleteById(Membership, id)
    }

    static async relateUser(membershipId, userId) {
        return await super.query(`INSERT INTO "UsersMemberships" 
            ("userId", "membershipId") 
            VALUES ('${userId}', '${membershipId}') 
            RETURNING *`)
    }

    static async unrelateUser(membershipId, userId) {
        return await super.query(`DELETE FROM "UsersMemberships" 
            WHERE "userId" = '${userId}'
            AND "membershipId" = '${membershipId}'`)
    }

    static async findUserMembership(userId, membershipId) {
        return await super.find(`SELECT * 
            FROM "UsersMemberships" 
            WHERE "userId" = '${userId}' 
            AND "membershipId" = '${membershipId}'`)
    }

}

export default MembershipRepository