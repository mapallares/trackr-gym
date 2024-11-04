import HandleableError from './Handleable.error.mjs'

export class AlreadyExistError extends HandleableError {

    constructor(message) {
        super(message)
        this.type = 'AlreadyExistError'
    }

}