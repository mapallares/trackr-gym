import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class PermissionAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'PermissionAlreadyExistError'
    }

}