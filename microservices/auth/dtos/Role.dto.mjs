import DTO from './dto/DTO.mjs'
import Role from '../entities/Role.entity.mjs'

export class RoleDTO extends DTO {

    constructor(user) {
        super(Role, user, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default RoleDTO