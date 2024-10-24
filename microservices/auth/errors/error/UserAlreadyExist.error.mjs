import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class UserAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'UserAlreadyExistError'
    }

}