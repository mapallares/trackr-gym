import { ServiceMethodNotImplementedError } from '../../../errors/error/ServiceMethodNotImplemented.error.mjs'

export class Service {

    static implements() {
        throw new ServiceMethodNotImplementedError("El método del servicio no ha sido implementado")
    }
    
}

export default Service