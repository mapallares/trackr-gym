import HandleableError from './Handleable.error.mjs'

export class NotImplementedError extends HandleableError {

    constructor(message) {
        super(message)
        this.type = 'NotImplementedError'
    }

}