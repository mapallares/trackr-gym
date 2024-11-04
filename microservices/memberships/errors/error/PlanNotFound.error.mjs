import { NotFoundError } from './NotFound.error.mjs'

export class PlanNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'PlanNotFoundError'
    }

}