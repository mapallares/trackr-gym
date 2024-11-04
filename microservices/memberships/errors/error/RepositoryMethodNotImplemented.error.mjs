import { NotImplementedError } from './NotImplemented.error.mjs'

export class RepositoryMethodNotImplementedError extends NotImplementedError {

    constructor(message) {
        super(message)
        this.type = 'RepositoryMethodNotImplementedError'
    }

}