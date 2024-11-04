import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class BenefitAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'BenefitAlreadyExistError'
    }

}