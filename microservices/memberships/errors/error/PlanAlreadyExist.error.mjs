import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class PlanAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'PlanAlreadyExistError'
    }

}