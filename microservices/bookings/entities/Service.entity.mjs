import Entity from './entity/Entity.mjs'

export class Service extends Entity {

    constructor(object) {
        super(Service, object)
    }

    static table = {
        name: 'Services',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'name',
            type: 'string',
            nulleable: false
        },
        {
            name: 'description',
            type: 'string',
            nulleable: true
        },
        {
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'cost',
            type: 'string',
            nulleable: false
        },
        {
            name: 'duration',
            type: 'date',
            nulleable: false
        },
        {
            name: 'availableFrom',
            type: 'date',
            nulleable: false
        },
        {
            name: 'availableTo',
            type: 'date',
            nulleable: true
        },
        {
            name: 'status',
            type: 'string',
            nulleable: false
        },
        {
            name: 'isActive',
            type: 'boolean',
            nulleable: false
        },
        {
            name: 'createdAt',
            type: 'date',
            nulleable: false
        },
        {
            name: 'createdBy',
            type: 'string',
            nulleable: false
        },
        {
            name: 'updatedAt',
            type: 'date',
            nulleable: true
        },
        {
            name: 'updatedBy',
            type: 'string',
            nulleable: true
        }
    ]

    static relations = {
        toMany: [
            {
                table: 'Activities',
                by: 'serviceId'
            }
        ],
        toOne: []
    }

    get(columns = [], including = true) {
        return super.get(Service, columns, including)
    }

    set(object, replacing) {
        return super.set(Service, object, replacing)
    }

}

export default Service