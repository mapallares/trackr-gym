import Entity from './entity/Entity.mjs'

export class CurrencyAmountUnitType extends Entity {

    constructor(object) {
        super(CurrencyAmountUnitType, object)
    }

    static table = {
        name: 'CurrencyAmountUnitTypes',
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
            name: 'symbol',
            type: 'string',
            nulleable: false
        },
        {
            name: 'unit',
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
                by: 'CurrencyAmountUnitTypeId'
            },
            {
                table: 'Invoices',
                by: 'CurrencyAmountUnitTypeId'
            }
        ],
        toOne: []
    }

    get(columns = [], including = true) {
        return super.get(CurrencyAmountUnitType, columns, including)
    }

    set(object, replacing) {
        return super.set(CurrencyAmountUnitType, object, replacing)
    }

}

export default CurrencyAmountUnitType