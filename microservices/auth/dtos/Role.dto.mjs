import DTO from './dto/DTO.mjs'
import Role from '../entities/Role.entity.mjs'

export class RoleDTO extends DTO {

    constructor(role) {
        super(Role, role, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default RoleDTO