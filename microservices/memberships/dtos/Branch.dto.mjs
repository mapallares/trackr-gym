import DTO from './dto/DTO.mjs'
import Branch from '../entities/Branch.entity.mjs'

export class BranchDTO extends DTO {

    constructor(branch) {
        super(Branch, branch, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default BranchDTO