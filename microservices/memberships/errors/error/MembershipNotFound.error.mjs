import { NotFoundError } from './NotFound.error.mjs'

export class MembershipNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'MembershipNotFoundError'
    }

}