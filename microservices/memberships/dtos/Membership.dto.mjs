import DTO from './dto/DTO.mjs'
import Membership from '../entities/Membership.entity.mjs'

export class MembershipDTO extends DTO {

    constructor(membership) {
        super(Membership, membership, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default MembershipDTO