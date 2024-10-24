import Entity from './entity/Entity.mjs'

export class Role extends Entity {

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

    static getData(object) {
        return super.getData(this, object)
    }

}

export default Role