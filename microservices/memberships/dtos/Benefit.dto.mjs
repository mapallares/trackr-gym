import DTO from './dto/DTO.mjs'
import Benefit from '../entities/Benefit.entity.mjs'

export class BenefitDTO extends DTO {

    constructor(benefit) {
        super(Benefit, benefit, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default BenefitDTO