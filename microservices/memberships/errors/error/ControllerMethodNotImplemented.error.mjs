import { NotImplementedError } from './NotImplemented.error.mjs'

export class ControllerMethodNotImplementedError extends NotImplementedError {

    constructor(message) {
        super(message)
        this.type = 'ControllerMethodNotImplementedError'
    }

}