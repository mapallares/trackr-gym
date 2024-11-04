import ErrorHandler from '../../errors/ErrorHandler.mjs'
import { UnauthorizedError } from '../../errors/error/Unauthorized.error.mjs'

export class Controller {
    
    static async process(request, response, method, roles = [], permissions = []) {
        if(!roles || !(roles instanceof Array)) roles = []
        if(!permissions || !(permissions instanceof Array)) permissions = []
        try {
            roles.forEach(role => {
                if(!request.user.roles.includes(role)) throw new UnauthorizedError('No tiene los roles requeridos')
            })
            permissions.forEach(permission => {
                if(!request.user.permissions.includes(permission)) throw new UnauthorizedError('No tiene los permisos requeridos')
            })
            await method()
        }
        catch (error) {
            ErrorHandler(error, response)
        }
    }

}

export default Controller