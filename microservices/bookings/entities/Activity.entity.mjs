import Entity from './entity/Entity.mjs'

export class Activity extends Entity {

    constructor(object) {
        super(Activity, object)
    }

    static table = {
        name: 'Activities',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'serviceId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'branchId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'name',
            type: 'string',
            nulleable: false
        },
        {
            name: 'details',
            type: 'string',
            nulleable: true
        },
        {
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'inCharge',
            type: 'string',
            nulleable: false
        },
        {
            name: 'capacity',
            type: 'numeric',
            nulleable: false
        },
        {
            name: 'date',
            type: 'date',
            nulleable: false
        },
        {
            name: 'startTime',
            type: 'date',
            nulleable: false
        },
        {
            name: 'endTime',
            type: 'date',
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
                table: 'Bookings',
                by: 'activiyId'
            }
        ],
        toOne: [
            {
                table: 'Services',
                by: 'serviceId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Activity, columns, including)
    }

    set(object, replacing) {
        return super.set(Activity, object, replacing)
    }

}

export default Activity