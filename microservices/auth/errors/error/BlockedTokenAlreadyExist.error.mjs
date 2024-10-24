import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class BlockedTokenAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'BlockedTokenAlreadyExistError'
    }

}