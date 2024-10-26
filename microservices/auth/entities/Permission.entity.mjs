import Entity from './entity/Entity.mjs'

export class Permission extends Entity {

    constructor(object) {
        super(Permission, object)
    }

    static table = {
        name: 'Permissions',
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
                table: 'RolesPermissions',
                by: 'permissionId'
            }
        ],
        toOne: [
            {
                table: 'Types',
                by: 'permissionId'
            }
        ]
    }

    get(columns = [], including = true) {
        return super.get(Permission, columns, including)
    }

}

export default Permission