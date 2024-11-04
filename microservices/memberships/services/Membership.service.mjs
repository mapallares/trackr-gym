import Service from './service/Service.mjs'
import MembershipRepository from '../repositories/Membership.repository.mjs'
import { MembershipAlreadyExistError } from '../errors/error/MembershipAlreadyExist.error.mjs'
import { MembershipNotFoundError } from '../errors/error/MembershipNotFound.error.mjs'
import { AlreadyExistError } from '../errors/error/AlreadyExist.error.mjs'
import { NotFoundError } from '../errors/error/NotFound.error.mjs'

export class MembershipService extends Service {

    static async findAllMemberships() {
        return await MembershipRepository.findAll()
    }
    
    static async findAllUsersMembershipsById(id) {
        return await MembershipRepository.findAllUsersMembershipsById(id)
    }

    static async findAllMembershipsByUserId(userId) {
        return await MembershipRepository.findAllByUserId(userId)
    }

    static async findMembershipById(id) {
        return await MembershipRepository.findById(id)
    }

    static async saveMembership(membership) {
        let savedMembership = null
        try {
            savedMembership = await MembershipRepository.save(membership)
        } catch(error) {
            console.log(error)
            throw new MembershipAlreadyExistError('No se puede crear la membresía porque ya existe')
        }
        
        if(!savedMembership) throw new MembershipNotFoundError('La membresía no ha podido ser creada')

        return savedMembership
    }

    static async updateMembershipById(id, membership) {
        return await MembershipRepository.updateById(id, membership)
    }

    static async deleteMembershipById(id) {
        return await MembershipRepository.deleteById(id)
    }

    static async relateUser(membershipId, userId) {
        if(await this.existsUser(userId, membershipId)) throw new AlreadyExistError('La membresía ya está relacionado con el user')
        return await MembershipRepository.relateUser(membershipId, userId)
    }

    static async unrelateUser(membershipId, userId) {
        if(!await this.existsUser(userId, membershipId)) throw new NotFoundError('La membresía no está relacionado con el user')
        return await MembershipRepository.unrelateUser(membershipId, userId)  
    }

    static async existsUser(userId, membershipId) {
        const userMembership = await MembershipRepository.findUserMembership(userId, membershipId)
        return userMembership[0] ? true : false
    }

}

export default MembershipService