import Entity from './entity/Entity.mjs'

export class Product extends Entity {

    constructor(object) {
        super(Product, object)
    }

    static table = {
        name: 'Products',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'variantOfId',
            type: 'string',
            nulleable: true
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
            name: 'purchasePrice',
            type: 'string',
            nulleable: false
        },
        {
            name: 'salePrice',
            type: 'string',
            nulleable: false
        },
        {
            name: 'stock',
            type: 'numeric',
            nulleable: false
        },
        {
            name: 'isSaleProduct',
            type: 'boolean',
            nulleable: false
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
                table: 'Details',
                by: 'productId'
            },
            {
                table: 'InventoryMovements',
                by: 'productId'
            }
        ],
        toOne: [
            {
                table: 'Products',
                by: 'variantOfId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Product, columns, including)
    }

    set(object, replacing) {
        return super.set(Product, object, replacing)
    }

}

export default Product