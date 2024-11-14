import Branch from '../entities/Branch.entity.mjs'
import Repository from './repository/Repository.mjs'
import ScheduleRepository from './Schedule.repository.mjs'

export class BranchRepository extends Repository {

    static async findAll() {
        let branches = await super.findAll(Branch)
        for(let i = 0; i < branches.length; i++) {
            const branch = branches[i]
            const schedules = await ScheduleRepository.findAllByBranchId(branch.id)
            branches[i] = {...branch, schedules }
        }
        return branches
    }

    static async findAllByGymId(gymId) {
        let branches = await super.findAllByColumn(Branch, { gymId })
        for(let i = 0; i < branches.length; i++) {
            const branch = branches[i]
            const schedules = await ScheduleRepository.findAllByBranchId(branch.id)
            branches[i] = {...branch, schedules }
        }
        return branches
    }

    static async findAllByPlanId(planId) {
        let branches = await super.find(`SELECT B.*
            FROM "Branches" AS B
            INNER JOIN "PlansBranches" AS PB
            ON B."id" = PB."branchId"
            INNER JOIN "Plans" AS P
            ON PB."planId" = P."id"
            WHERE PB."planId" = '${planId}'`)
        for(let i = 0; i < branches.length; i++) {
            const branch = branches[i]
            const schedules = await ScheduleRepository.findAllByBranchId(branch.id)
            branches[i] = {...branch, schedules }
        }
        return branches
    }

    static async findById(id) {
        let branch = await super.findById(Branch, id)
        const schedules = await ScheduleRepository.findAllByBranchId(id)
        return {...branch, schedules }
    }

    static async save(branch) {
        return await super.saveAll(Branch, branch)
    }

    static async updateById(id, branch) {
        return await super.updateById(Branch, id, branch)
    }

    static async deleteById(id) {
        return await super.deleteById(Branch, id)
    }

    static async relatePlan(branchId, planId) {
        return await super.query(`INSERT INTO "PlansBranches" 
            ("planId", "branchId") 
            VALUES ('${planId}', '${branchId}') 
            RETURNING *`)
    }

    static async unrelatePlan(branchId, planId) {
        return await super.query(`DELETE FROM "PlansBranches" 
            WHERE "planId" = '${planId}'
            AND "branchId" = '${branchId}'`)
    }

    static async findPlanBranch(planId, branchId) {
        return await super.find(`SELECT * 
            FROM "PlansBranches" 
            WHERE "planId" = '${planId}' 
            AND "branchId" = '${branchId}'`)
    }

}

export default BranchRepository