import Entity from './entity/Entity.mjs'

export class Schedule extends Entity {

    constructor(object) {
        super(Schedule, object)
    }

    static table = {
        name: 'Schedules',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'branchId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'description',
            type: 'string',
            nulleable: true
        },
        {
            name: 'day',
            type: 'string',
            nulleable: false
        },
        {
            name: 'startTime',
            type: 'date',
            nulleable: false,
        },
        {
            name: 'endTime',
            type: 'date',
            nulleable: false,
        },
        {
            name: 'isRecurrent',
            type: 'boolean',
            nulleable: false,
            default: true
        },
        {
            name: 'isAppliesOnHolidays',
            type: 'date',
            nulleable: false,
            default: false
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
                table: 'SchedulesBenefits',
                table: 'planId'
            },
            {
                table: 'SchedulesBranches',
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
        return super.get(Schedule, columns, including)
    }

    set(object, replacing) {
        return super.set(Schedule, object, replacing)
    }

}

export default Schedule