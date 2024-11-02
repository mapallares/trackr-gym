import DTO from './dto/DTO.mjs'
import User from '../entities/User.entity.mjs'

export class UserDTO extends DTO {

    constructor(user) {
        super(User, user, ['password'])
    }

}

export default UserDTO