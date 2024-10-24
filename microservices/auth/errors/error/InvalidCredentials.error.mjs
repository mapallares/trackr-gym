import HandleableError from './Handleable.error.mjs'

export class InvalidCredentialsError extends HandleableError {

    constructor(message) {
        super(message)
        this.message = message
        this.type = 'InvalidCredentialsError'
    }

}