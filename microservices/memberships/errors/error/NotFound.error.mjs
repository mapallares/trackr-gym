import HandleableError from './Handleable.error.mjs'

export class NotFoundError extends HandleableError {

    constructor(message) {
        super(message)
        this.type = 'NotFoundError'
    }

}