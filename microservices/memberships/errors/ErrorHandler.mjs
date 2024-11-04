import HandleableError from './error/Handleable.error.mjs'
import { NotFoundError } from './error/NotFound.error.mjs'
import { PlanNotFoundError } from './error/PlanNotFound.error.mjs'
import { InvalidFormatError } from './error/InvalidFormat.error.mjs'
import { AlreadyExistError } from './error/AlreadyExist.error.mjs'
import { PlanAlreadyExistError } from './error/PlanAlreadyExist.error.mjs'
import { NotImplementedError } from './error/NotImplemented.error.mjs'
import { ServiceMethodNotImplementedError } from './error/ServiceMethodNotImplemented.error.mjs'
import { ControllerMethodNotImplementedError } from './error/ControllerMethodNotImplemented.error.mjs'
import { UndefinedEntityAttributeError } from './error/UndefinedEntityAttribute.error.mjs'
import { UnauthorizedError } from './error/Unauthorized.error.mjs'
import { TokenRequiredError } from './error/TokenRequired.error.mjs'

export default function ErrorHandler (error, response) {
    if (error instanceof InvalidFormatError) return response.status(400).send(error.getMessage())
    else if (error instanceof UnauthorizedError) return response.status(401).send(error.getMessage())
    else if (error instanceof TokenRequiredError) return response.status(403).send(error.getMessage())
    else if (error instanceof NotFoundError) return response.status(404).send(error.getMessage())
    else if (error instanceof AlreadyExistError) return response.status(409).send(error.getMessage())
    else if (error instanceof NotImplementedError || error instanceof UndefinedEntityAttributeError) return response.status(501).send(error.getMessage())
    else {
        console.log(error)
        return response.status(500).send('Internal Server Error')
    }
}