import { NotFoundError } from './NotFound.error.mjs'

export class GymNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'GymNotFoundError'
    }

}