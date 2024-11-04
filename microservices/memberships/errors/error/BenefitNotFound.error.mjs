import { NotFoundError } from './NotFound.error.mjs'

export class BenefitNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'BenefitNotFoundError'
    }

}