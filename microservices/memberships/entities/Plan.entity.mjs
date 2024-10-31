import Entity from './entity/Entity.mjs'

export class Plan extends Entity {

    constructor(object) {
        super(Plan, object)
    }

    static table = {
        name: 'Plans',
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
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'price',
            type: 'numeric',
            nulleable: false,
            default: 0
        },
        {
            name: 'ability',
            type: 'numeric',
            nulleable: false,
            default: 1
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
                table: 'PlansBenefits',
                table: 'planId'
            },
            {
                table: 'PlansBranches',
                by: 'planId'
            },
            {
                table: 'Memberships',
                table: 'planId'
            }
        ],
        toOne: [
            {
                table: 'Gyms',
                by: 'gymId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Plan, columns, including)
    }

    set(object, replacing) {
        return super.set(Plan, object, replacing)
    }

}

export default Plan