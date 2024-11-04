import Entity from './entity/Entity.mjs'

export class Network extends Entity {

    constructor(object) {
        super(Network, object)
    }

    static table = {
        name: 'Networks',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'gymId',
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
            name: 'label',
            type: 'string',
            nulleable: false
        },
        {
            name: 'profile',
            type: 'string',
            nulleable: false
        },
        {
            name: 'link',
            type: 'string',
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
        toMany: [],
        toOne: [
            {
                table: 'Gyms',
                by: 'gymId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Network, columns, including)
    }

    set(object, replacing) {
        return super.set(Network, object, replacing)
    }

}

export default Network