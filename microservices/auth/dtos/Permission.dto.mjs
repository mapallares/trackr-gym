import DTO from './dto/DTO.mjs'
import Permission from '../entities/Permission.entity.mjs'

export class PermissionDTO extends DTO {

    constructor(user) {
        super(Permission, user, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default PermissionDTO