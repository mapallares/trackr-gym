import { InvalidFormatError } from './InvalidFormat.error.mjs'

export class RegisterInvalidFormatError extends InvalidFormatError {

    constructor(message) {
        super(message)
        this.type = 'RegisterInvalidFormatError'
    }

}