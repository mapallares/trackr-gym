import Entity from './entity/Entity.mjs'

export class Invoice extends Entity {

    constructor(object) {
        super(Invoice, object)
    }

    static table = {
        name: 'Invoices',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'paymentId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'emissionDate',
            type: 'date',
            nulleable: false
        },
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'totalCurrencyAmount',
            type: 'numeric',
            nulleable: false
        },
        {
            name: 'currencyAmountUnitTypeId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'code',
            type: 'string',
            nulleable: false
        },
        {
            name: 'isActive',
            type: 'boolean',
            nulleable: false
        },
        {
            name: 'isCorrect',
            type: 'boolean',
            nulleable: false
        },
        {
            name: 'isValid',
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
                table: 'Payments',
                by: 'paymentId'
            },
            {
                table: 'CurrencyAmountUnitTypes',
                by: 'currencyAmountUnitTypeId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Invoice, columns, including)
    }

    set(object, replacing) {
        return super.set(Invoice, object, replacing)
    }

}

export default Invoice