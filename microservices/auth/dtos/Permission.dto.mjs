import DTO from './dto/DTO.mjs'
import Permission from '../entities/Permission.entity.mjs'

export class PermissionDTO extends DTO {

    constructor(permission) {
        super(Permission, permission, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default PermissionDTO