import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class NetworkAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'NetworkAlreadyExistError'
    }

}