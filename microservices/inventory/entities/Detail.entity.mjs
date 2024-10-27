import Entity from './entity/Entity.mjs'

export class Detail extends Entity {

    constructor(object) {
        super(Detail, object)
    }

    static table = {
        name: 'Details',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'productId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'key',
            type: 'string',
            nulleable: false
        },
        {
            name: 'value',
            type: 'string',
            nulleable: true
        },
        {
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'isVisible',
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
        toMany: [],
        toOne: [
            {
                table: 'Products',
                by: 'productId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Detail, columns, including)
    }

    set(object, replacing) {
        return super.set(Detail, object, replacing)
    }

}

export default Detail