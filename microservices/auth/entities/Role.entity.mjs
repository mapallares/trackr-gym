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
            type: 'string',
            nulleable: false
        },
        {
            name: 'name',
            type: 'string',
            nulleable: false
        },
        {
            name: 'description',
            type: 'string',
            nulleable: false
        },
        {
            name: 'childOfId',
            type: 'string',
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

    set(object, replacing) {
        return super.set(Role, object, replacing)
    }

}

export default Role