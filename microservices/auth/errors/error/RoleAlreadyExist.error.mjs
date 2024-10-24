import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class RoleAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'RoleAlreadyExistError'
    }

}