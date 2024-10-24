import HandleableError from './Handleable.error.mjs'

export class UndefinedEntityAttributeError extends HandleableError {

    constructor(message) {
        super(message)
        this.type = 'UndefinedEntityAttributeError'
    }

}