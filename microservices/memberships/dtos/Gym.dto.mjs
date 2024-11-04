import DTO from './dto/DTO.mjs'
import Gym from '../entities/Gym.entity.mjs'

export class GymDTO extends DTO {

    constructor(gym) {
        super(Gym, gym, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default GymDTO