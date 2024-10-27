import Entity from './entity/Entity.mjs'

export class Payment extends Entity {

    constructor(object) {
        super(Payment, object)
    }

    static table = {
        name: 'Payments',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'userId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'reason',
            type: 'string',
            nulleable: false
        },
        {
            name: 'description',
            type: 'string',
            nulleable: true
        },
        {
            name: 'paymentMethodId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'paymentDate',
            type: 'date',
            nulleable: false
        },
        {
            name: 'paymentPercentage',
            type: 'numeric',
            nulleable: false
        },
        {
            name: 'reference',
            type: 'string',
            nulleable: false
        },
        {
            name: 'currencyAmount',
            type: 'string',
            nulleable: false
        },
        {
            name: 'currencyAmountUnitTypeId',
            type: 'string',
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
                table: 'PaymentsComments',
                by: 'paymentId'
            },
            {
                table: 'Invoices',
                by: 'paymentId'
            }
        ],
        toOne: [
            {
                table: 'PaymentMethods',
                by: 'paymentMethodId'
            },
            {
                table: 'CurrencyAmountUnitTypes',
                by: 'currencyAmountUnitTypeId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Payment, columns, including)
    }

    set(object, replacing) {
        return super.set(Payment, object, replacing)
    }

}

export default Payment