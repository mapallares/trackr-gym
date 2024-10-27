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
            type: 'string'
        },
        {
            name: 'createdAt',
            type: 'date'
        },
        {
            name: 'createdBy',
            type: 'string'
        },
        {
            name: 'updatedAt',
            type: 'date'
        },
        {
            name: 'updatedBy',
            type: 'string'
        }
    ]

    static relations = {
        toMany: [],
        toOne: [
            {
                table: 'Users',
                by: 'userId'
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