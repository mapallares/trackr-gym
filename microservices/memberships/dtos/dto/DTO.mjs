import Entity from '../../entities/entity/Entity.mjs'

export class DTO {

    constructor(entity, object, excepting = []) {
        if(!Entity.isPrototypeOf(entity)) throw new Error('No se ha inyectado una entidad válida para contruir el DTO')
        let dto = (object instanceof entity) ? object.get(excepting, false) : entity.mapper(object, excepting)
        Object.keys(dto).forEach(attribute => {
            this[attribute] = dto[attribute]
        })
    }

}

export default DTO