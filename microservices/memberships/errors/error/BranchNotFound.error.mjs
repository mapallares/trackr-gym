import { NotFoundError } from './NotFound.error.mjs'

export class BranchNotFoundError extends NotFoundError {

    constructor(message) {
        super(message)
        this.type = 'BranchNotFoundError'
    }

}