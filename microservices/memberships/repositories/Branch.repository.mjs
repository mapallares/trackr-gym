import Branch from '../entities/Branch.entity.mjs'
import Repository from './repository/Repository.mjs'

export class BranchRepository extends Repository {

    static async findAll() {
        return super.findAll(Branch)
    }

    static async findAllByGymId(gymId) {
        return await super.findAllByColumn(Branch, { gymId })
    }

    static async findAllByPlanId(planId) {
        return await super.find(`SELECT B.*
            FROM "Branches" AS B
            INNER JOIN "PlansBranches" AS PB
            ON B."id" = PB."branchId"
            INNER JOIN "Plans" AS P
            ON PB."planId" = P."id"
            WHERE PB."planId" = '${planId}'`)
    }

    static async findById(id) {
        return await super.findById(Branch, id)
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