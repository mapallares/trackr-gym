import Entity from './entity/Entity.mjs'

export class InventoryMovement extends Entity {

    constructor(object) {
        super(InventoryMovement, object)
    }

    static table = {
        name: 'InventoryMovements',
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
            name: 'paymentId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'quantity',
            type: 'numeric',
            nulleable: false
        },
        {
            name: 'description',
            type: 'string',
            nulleable: true
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
        return super.get(InventoryMovement, columns, including)
    }

    set(object, replacing) {
        return super.set(InventoryMovement, object, replacing)
    }

}

export default InventoryMovement