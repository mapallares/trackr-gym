import Entity from './entity/Entity.mjs'

export class Benefit extends Entity {

    constructor(object) {
        super(Benefit, object)
    }

    static table = {
        name: 'Benefits',
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
            name: 'type',
            type: 'string',
            nulleable: false
        },
        {
            name: 'description',
            type: 'string',
            nulleable: true
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
                table: 'PlansBenefits',
                by: 'benefitId'
            }
        ],
        toOne: []
    }

    get(columns = [], including = true) {
        return super.get(Benefit, columns, including)
    }

    set(object, replacing) {
        return super.set(Benefit, object, replacing)
    }

}

export default Benefit