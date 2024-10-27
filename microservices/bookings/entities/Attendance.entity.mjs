import Entity from './entity/Entity.mjs'

export class Attendance extends Entity {

    constructor(object) {
        super(Attendance, object)
    }

    static table = {
        name: 'Attendances',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'bookingId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'userId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'date',
            type: 'date',
            nulleable: false
        },
        {
            name: 'arrivalTime',
            type: 'date',
            nulleable: false
        },
        {
            name: 'departureTime',
            type: 'date',
            nulleable: false
        },
        {
            name: 'comments',
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
        toMany: [],
        toOne: [
            {
                table: 'Bookings',
                by: 'bookingId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Attendance, columns, including)
    }

    set(object, replacing) {
        return super.set(Attendance, object, replacing)
    }

}

export default Attendance