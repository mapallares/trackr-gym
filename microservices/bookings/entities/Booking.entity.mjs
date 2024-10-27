import Entity from './entity/Entity.mjs'

export class Booking extends Entity {

    constructor(object) {
        super(Booking, object)
    }

    static table = {
        name: 'Bookings',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'activityId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'userId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'branchId',
            type: 'string',
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
            name: 'reason',
            type: 'string',
            nulleable: false
        },
        {
            name: 'isApproved',
            type: 'boolean',
            nulleable: false
        },
        {
            name: 'isCancelled',
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
                table: 'Attendances',
                by: 'bookingId'
            }
        ],
        toOne: [
            {
                table: 'Activities',
                by: 'activityId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Booking, columns, including)
    }

    set(object, replacing) {
        return super.set(Booking, object, replacing)
    }

}

export default Booking