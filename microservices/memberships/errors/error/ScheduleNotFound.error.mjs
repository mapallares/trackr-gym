import { NotFoundError } from './NotFound.error.mjs'

export class ScheduleNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'ScheduleNotFoundError'
    }

}