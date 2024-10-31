import Entity from './entity/Entity.mjs'

export class User extends Entity {

    constructor(object) {
        super(User, object)
    }

    static table = {
        name: 'Users',
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
            name: 'username',
            type: 'string',
            nulleable: false
        },
        {
            name: 'email',
            type: 'string',
            nulleable: false
        },
        {
            name: 'password',
            type: 'string',
            nulleable: false
        },
        {
            name: 'lastLogin',
            type: 'date',
            nulleable: true
        },
        {
            name: 'isOnline',
            type: 'boolean',
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
            name: 'registerDate',
            type: 'date',
            nulleable: false,
            default: 'NOW()'
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
                table: 'UsersRoles',
                by: 'userId'
            },
            {
                table: 'Attributes',
                by: 'userId'
            },
            {
                table: 'BlockedTokens',
                by: 'userId'
            }
        ],
        toOne: []
    }

    get(columns = [], including = true) {
        return super.get(User, columns, including)
    }

    set(object, replacing = true) {
        return super.set(User, object, replacing)
    }

}

export default User