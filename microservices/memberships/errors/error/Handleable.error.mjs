export class HandleableError extends Error {

    constructor(message) {
        super(message)
        this.message = message
        this.type = 'Error'
    }

    getMessage() {
        return {
            type: this.type,
            message: this.message
        }
    }
    
}

export default HandleableError