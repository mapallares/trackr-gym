import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class BranchAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'BranchAlreadyExistError'
    }

}