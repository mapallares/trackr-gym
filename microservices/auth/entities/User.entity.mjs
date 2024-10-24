import Entity from './entity/Entity.mjs'

export class User extends Entity {

    static table = {
        name: 'Users',
        id: 'id'
    }

    static columns = [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        },
        {
            name: 'lastLogin',
            type: 'date'
        },
        {
            name: 'isOnline',
            type: 'boolean'
        },
        {
            name: 'status',
            type: 'string'
        },
        {
            name: 'isActive',
            type: 'boolean'
        },
        {
            name: 'registerDate',
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

export default User