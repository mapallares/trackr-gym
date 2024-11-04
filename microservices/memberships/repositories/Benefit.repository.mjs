import Benefit from '../entities/Benefit.entity.mjs'
import Repository from './repository/Repository.mjs'

export class BenefitRepository extends Repository {

    static async findAll() {
        return super.findAll(Benefit)
    }

    static async findAllByGymId(gymId) {
        return await super.findAllByColumn(Benefit, { gymId })
    }

    static async findAllByPlanId(planId) {
        return await super.find(`SELECT B.*,
            PB."isApplicable"
            FROM "Benefits" AS B
            INNER JOIN "PlansBenefits" AS PB
            ON B."id" = PB."benefitId"
            INNER JOIN "Plans" AS P
            ON PB."planId" = P."id"
            WHERE PB."planId" = '${planId}'`)
    }

    static async findById(id) {
        return await super.findById(Benefit, id)
    }

    static async save(benefit) {
        return await super.saveAll(Benefit, benefit)
    }

    static async updateById(id, benefit) {
        return await super.updateById(Benefit, id, benefit)
    }

    static async deleteById(id) {
        return await super.deleteById(Benefit, id)
    }

    static async relatePlan(benefitId, planId, isApplicable) {
        return await super.query(`INSERT INTO "PlansBenefits" 
            ("planId", "benefitId", "isApplicable") 
            VALUES ('${planId}', '${benefitId}', ${isApplicable}) 
            RETURNING *`)
    }

    static async modifyRelationPlan(benefitId, planId, isApplicable) {
        return await super.query(`UPDATE "PlansBenefits"
            SET "isApplicable" = ${isApplicable}
            WHERE "planId" = '${planId}'
            AND "benefitId" = '${benefitId}'`)
    }

    static async unrelatePlan(benefitId, planId) {
        return await super.query(`DELETE FROM "PlansBenefits" 
            WHERE "planId" = '${planId}'
            AND "benefitId" = '${benefitId}'`)
    }

    static async findPlanBenefit(planId, benefitId) {
        return await super.find(`SELECT * 
            FROM "PlansBenefits" 
            WHERE "planId" = '${planId}' 
            AND "benefitId" = '${benefitId}'`)
    }

}

export default BenefitRepository