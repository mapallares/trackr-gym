import Entity from './entity/Entity.mjs'

export class Gym extends Entity {

    constructor(object) {
        super(Gym, object)
    }

    static table = {
        name: 'Gyms',
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
            name: 'slogan',
            type: 'string',
            nulleable: true
        },
        {
            name: 'nit',
            type: 'string',
            nulleable: true
        },
        {
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'adress',
            type: 'string',
            nulleable: false
        },
        {
            name: 'phone',
            type: 'string',
            nulleable: false
        },
        {
            name: 'email',
            type: 'string',
            nulleable: false
        },
        {
            name: 'foundedIn',
            type: 'date',
            nulleable: false
        },
        {
            name: 'status',
            type: 'string',
            nulleable: false,
            default: 'Created'
        },
        {
            name: 'isActive',
            type: 'boolean',
            nulleable: false,
            default: true
        },
        {
            name: 'createdAt',
            type: 'date',
            nulleable: false,
            default: 'NOW()'
        },
        {
            name: 'createdBy',
            type: 'string',
            nulleable: false,
            default: 'System'
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
                table: 'Branches',
                by: 'gymId'
            },
            {
                table: 'Networks',
                by: 'gymId'
            },
            {
                table: 'Plans',
                by: 'gymId'
            }
        ],
        toOne: []
    }

    get(columns = [], including = true) {
        return super.get(Gym, columns, including)
    }

    set(object, replacing) {
        return super.set(Gym, object, replacing)
    }

}

export default Gym