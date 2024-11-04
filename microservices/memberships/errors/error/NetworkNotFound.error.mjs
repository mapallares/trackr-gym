import { NotFoundError } from './NotFound.error.mjs'

export class NetworkNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'NetworkNotFoundError'
    }

}