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

    set(object, replacing) {
        return super.set(Permission, object, replacing)
    }

}

export default Permission