import Schedule from '../entities/Schedule.entity.mjs'
import Repository from './repository/Repository.mjs'

export class ScheduleRepository extends Repository {

    static async findAll() {
        return super.findAll(Schedule)
    }

    static async findAllByBranchId(branchId) {
        return await super.findAllByColumn(Schedule, { branchId })
    }

    static async findById(id) {
        return await super.findById(Schedule, id)
    }

    static async save(schedule) {
        return await super.saveAll(Schedule, schedule)
    }

    static async updateById(id, schedule) {
        return await super.updateById(Schedule, id, schedule)
    }

    static async deleteById(id) {
        return await super.deleteById(Schedule, id)
    }

}

export default ScheduleRepository