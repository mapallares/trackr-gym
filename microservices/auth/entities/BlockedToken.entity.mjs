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
            type: 'string'
        },
        {
            name: 'userId',
            type: 'string'
        },
        {
            name: 'token',
            type: 'string'
        },
        {
            name: 'expiration',
            type: 'date'
        },
        {
            name: 'createdAt',
            type: 'date'
        },
        {
            name: 'createdBy',
            type: 'string'
        },
        {
            name: 'updatedAt',
            type: 'date'
        },
        {
            name: 'updatedBy',
            type: 'string'
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