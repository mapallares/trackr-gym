import Entity from './entity/Entity.mjs'

export class Role extends Entity {

    constructor(object) {
        super(Role, object)
    }

    static table = {
        name: 'Roles',
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
            name: 'description',
            type: 'string'
        },
        {
            name: 'childOfId',
            type: 'string'
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
        toMany: [
            {
                table: 'Roles',
                by: 'childOfId'
            },
            {
                table: 'RolesPermissions',
                by: 'roleId'
            },
            {
                table: 'UsersRoles',
                by: 'roleId'
            }
        ],
        toOne: []
    }

    get(columns = [], including = true) {
        return super.get(Role, columns, including)
    }

}

export default Role