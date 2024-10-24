import jwt from 'jsonwebtoken'
import Controller from './controller/Controller.mjs'
import BlockedTokenService from '../services/BlockedToken.service.mjs'
import { TokenRequiredError } from '../errors/error/TokenRequired.error.mjs'
import { UnauthorizedError } from '../errors/error/Unauthorized.error.mjs'

export class MiddlewareController extends Controller {

    static async verify(request, response, next) {
        super.process(request, response, async () => {
            const token = request.headers['authorization']
            if (!token) throw new TokenRequiredError('Se requiere un token de autenticación')

            if (await BlockedTokenService.existsBlockedTokenByToken(token)) throw new UnauthorizedError('El token está bloqueado')

            try {
              const decoded = jwt.verify(token, process.env.JWT_SECRET)
              request.user = decoded
              next()
            } catch (error) {
              if(error.name == 'TokenExpiredError') throw new UnauthorizedError('El token ha vencido')
              throw new UnauthorizedError('El token es inválido')
            }
        })
    }

}

export default MiddlewareController