import Entity from './entity/Entity.mjs'

export class PaymentMethod extends Entity {

    constructor(object) {
        super(PaymentMethod, object)
    }

    static table = {
        name: 'PaymentMethods',
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
            name: 'abbreviation',
            type: 'string',
            nulleable: false
        },
        {
            name: 'description',
            type: 'string',
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
                table: 'Payments',
                by: 'paymentMethodId'
            }
        ],
        toOne: []
    }

    get(columns = [], including = true) {
        return super.get(PaymentMethod, columns, including)
    }

    set(object, replacing) {
        return super.set(PaymentMethod, object, replacing)
    }

}

export default PaymentMethod