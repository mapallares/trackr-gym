import HandleableError from './error/Handleable.error.mjs'
import { NotFoundError } from './error/NotFound.error.mjs'
import { UserNotFoundError } from './error/UserNotFound.error.mjs'
import { RoleNotFoundError } from './error/RoleNotFound.error.mjs'
import { PermissionNotFoundError } from './error/PermissionNotFound.error.mjs'
import { InvalidFormatError } from './error/InvalidFormat.error.mjs'
import { RegisterInvalidFormatError } from './error/RegisterInvalidFormat.error.mjs'
import { LoginInvalidFormatError } from './error/LoginInvalidFormat.error.mjs'
import { AlreadyExistError } from './error/AlreadyExist.error.mjs'
import { UserAlreadyExistError } from './error/UserAlreadyExist.error.mjs'
import { BlockedTokenAlreadyExistError } from './error/BlockedTokenAlreadyExist.error.mjs'
import { RoleAlreadyExistError } from './error/RoleAlreadyExist.error.mjs'
import { PermissionAlreadyExistError } from './error/PermissionAlreadyExist.error.mjs'
import { NotImplementedError } from './error/NotImplemented.error.mjs'
import { ServiceMethodNotImplementedError } from './error/ServiceMethodNotImplemented.error.mjs'
import { ControllerMethodNotImplementedError } from './error/ControllerMethodNotImplemented.error.mjs'
import { UndefinedEntityAttributeError } from './error/UndefinedEntityAttribute.error.mjs'
import { InvalidCredentialsError } from './error/InvalidCredentials.error.mjs'
import { UnauthorizedError } from './error/Unauthorized.error.mjs'
import { TokenRequiredError } from './error/TokenRequired.error.mjs'

export default function ErrorHandler (error, response) {
    if (error instanceof InvalidFormatError) return response.status(400).send(error.getMessage())
    else if (error instanceof InvalidCredentialsError || error instanceof UnauthorizedError) return response.status(401).send(error.getMessage())
    else if (error instanceof TokenRequiredError) return response.status(403).send(error.getMessage())
    else if (error instanceof NotFoundError) return response.status(404).send(error.getMessage())
    else if (error instanceof AlreadyExistError) return response.status(409).send(error.getMessage())
    else if (error instanceof NotImplementedError || error instanceof UndefinedEntityAttributeError) return response.status(501).send(error.getMessage())
    else {
        console.log(error)
        return response.status(500).send('Internal Server Error')
    }
}