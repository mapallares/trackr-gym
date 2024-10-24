import jwt from 'jsonwebtoken'
import Controller from './controller/Controller.mjs'
import RoleService from '../services/Role.service.mjs'
import PermissionService from '../services/Permission.service.mjs'
import BlockedTokenService from '../services/BlockedToken.service.mjs'
import { UnauthorizedError } from '../errors/error/Unauthorized.error.mjs'

export class AuthorizationController extends Controller {

    static async session(request, response) {
        super.process(request, response, async () => {
            return response.status(200).json(request.user)
        })
    }

    static async roles(request, response) {
        const roles = await RoleService.findAllRolesByUserId(request.user.userId)
        response.json(roles.map(role => role.name))
    }

    static async permissions(request, response) {
        const permissions = await PermissionService.findAllPermissionsByUserId(request.user.userId)
        response.json(permissions.map(permissions => permissions.name))
    }

}

export default AuthorizationController