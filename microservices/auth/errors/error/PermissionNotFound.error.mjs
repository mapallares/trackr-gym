import { NotFoundError } from './NotFound.error.mjs'

export class PermissionNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'PermissionNotFoundError'
    }

}