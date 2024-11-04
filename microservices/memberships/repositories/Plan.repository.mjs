import Plan from '../entities/Plan.entity.mjs'
import Repository from './repository/Repository.mjs'

export class PlanRepository extends Repository {

    static async findAll() {
        return super.findAll(Plan)
    }

    static async findAllByGymId(gymId) {
        return await super.findAllByColumn(Plan, { gymId })
    }

    static async findById(id) {
        return await super.findById(Plan, id)
    }

    static async save(plan) {
        return await super.saveAll(Plan, plan)
    }

    static async updateById(id, plan) {
        return await super.updateById(Plan, id, plan)
    }

    static async deleteById(id) {
        return await super.deleteById(Plan, id)
    }

}

export default PlanRepository