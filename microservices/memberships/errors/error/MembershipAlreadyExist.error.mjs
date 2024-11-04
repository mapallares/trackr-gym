import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class MembershipAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'MembershipAlreadyExistError'
    }

}