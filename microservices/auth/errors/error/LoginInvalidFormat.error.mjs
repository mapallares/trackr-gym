import { InvalidFormatError } from './InvalidFormat.error.mjs'

export class LoginInvalidFormatError extends InvalidFormatError {

    constructor(message) {
        super(message)
        this.type = 'LoginInvalidFormatError'
    }

}