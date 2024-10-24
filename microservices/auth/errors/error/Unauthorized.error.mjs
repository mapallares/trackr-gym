import HandleableError from './Handleable.error.mjs'

export class UnauthorizedError extends HandleableError {

    constructor(message) {
        super(message)
        this.type = 'UnauthorizedError'
    }

}