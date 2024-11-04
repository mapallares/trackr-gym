import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class GymAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'GymAlreadyExistError'
    }

}