import HandleableError from './Handleable.error.mjs'

export class InvalidFormatError extends HandleableError {

    constructor(message) {
        super(message)
        this.type = 'InvalidFormatError'
    }

}