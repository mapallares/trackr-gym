import Entity from './entity/Entity.mjs'

export class BlockedToken extends Entity {

    constructor(object) {
        super(BlockedToken, object)
    }

    static table = {
        name: 'BlockedTokens',
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
            name: 'token',
            type: 'string',
            nulleable: false
        },
        {
            name: 'expiration',
            type: 'date',
            nulleable: false
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
        toMany: [],
        toOne: [
            {
                table: 'Users',
                by: 'userId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(BlockedToken, columns, including)
    }

    set(object, replacing) {
        return super.set(BlockedToken, object, replacing)
    }

}

export default BlockedToken