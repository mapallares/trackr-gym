import { AlreadyExistError } from './AlreadyExist.error.mjs'

export class ScheduleAlreadyExistError extends AlreadyExistError {

    constructor(message) {
        super(message)
        this.type = 'ScheduleAlreadyExistError'
    }

}