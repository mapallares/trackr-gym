import Entity from './entity/Entity.mjs'

export class BlockedToken extends Entity {

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

    static getData(object) {
        return super.getData(this, object)
    }

}

export default BlockedToken