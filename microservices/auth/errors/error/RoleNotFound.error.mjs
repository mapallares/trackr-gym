import { NotFoundError } from './NotFound.error.mjs'

export class RoleNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'RoleNotFoundError'
    }

}