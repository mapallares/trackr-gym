import { NotImplementedError } from './NotImplemented.error.mjs'

export class ServiceMethodNotImplementedError extends NotImplementedError {

    constructor(message) {
        super(message)
        this.type = 'ServiceMethodNotImplementedError'
    }

}