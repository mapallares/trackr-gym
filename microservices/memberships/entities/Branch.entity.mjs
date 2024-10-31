import Entity from './entity/Entity.mjs'

export class Branch extends Entity {

    constructor(object) {
        super(Branch, object)
    }

    static table = {
        name: 'Branches',
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
            name: 'description',
            type: 'string',
            nulleable: true
        },
        {
            name: 'location',
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
        toMany: [
            {
                table: 'Schedules',
                by: 'branchId'
            },
            {
                table: 'PlansBranches',
                by: 'branchId'
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
        return super.get(Branch, columns, including)
    }

    set(object, replacing) {
        return super.set(Branch, object, replacing)
    }

}

export default Branch