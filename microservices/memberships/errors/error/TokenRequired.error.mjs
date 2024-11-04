import HandleableError from './Handleable.error.mjs'

export class TokenRequiredError extends HandleableError {

    constructor(message) {
        super(message)
        this.type = 'TokenRequiredError'
    }

}