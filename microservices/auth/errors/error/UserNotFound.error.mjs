import { NotFoundError } from './NotFound.error.mjs'

export class UserNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'UserNotFoundError'
    }

}