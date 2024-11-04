import Entity from './entity/Entity.mjs'

export class Membership extends Entity {

    constructor(object) {
        super(Membership, object)
    }

    static table = {
        name: 'Memberships',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string',
            nulleable: false
        },
        {
            name: 'planId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'userId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'paymentId',
            type: 'string',
            nulleable: false
        },
        {
            name: 'purchaseDate',
            type: 'date',
            nulleable: false
        },
        {
            name: 'expirationDate',
            type: 'date',
            nulleable: false
        },
        {
            name: 'paymentDueDate',
            type: 'date',
            nulleable: false
        },
        {
            name: 'wasRenewed',
            type: 'boolean',
            nulleable: false,
            default: false
        },
        {
            name: 'isCancelled',
            type: 'boolean',
            nulleable: false,
            default: false
        },
        {
            name: 'isActive',
            type: 'boolean',
            nulleable: false,
            default: true
        },
        {
            name: 'status',
            type: 'string',
            nulleable: false,
            default: 'Created'
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
                table: 'UsersMemberships',
                by: 'membershipId'
            }
        ],
        toOne: [
            {
                table: 'Plans',
                by: 'planId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Membership, columns, including)
    }

    set(object, replacing) {
        return super.set(Membership, object, replacing)
    }

}

export default Membership