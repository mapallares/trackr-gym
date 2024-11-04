import DTO from './dto/DTO.mjs'
import Plan from '../entities/Plan.entity.mjs'

export class PlanDTO extends DTO {

    constructor(plan) {
        super(Plan, plan, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default PlanDTO