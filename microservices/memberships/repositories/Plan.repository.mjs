import Plan from '../entities/Plan.entity.mjs'
import BenefitRepository from './Benefit.repository.mjs'
import Repository from './repository/Repository.mjs'

export class PlanRepository extends Repository {

    static async findAll() {
        let plans = await super.findAll(Plan)
        for(let i = 0; i < plans.length; i++) {
            const plan = plans[i]
            const benefits = await BenefitRepository.findAllByPlanId(plan.id)
            plans[i] = {...plan, benefits }
        }
        return plans
    }

    static async findAllByGymId(gymId) {
        let plans = await super.findAllByColumn(Plan, { gymId })
        for(let i = 0; i < plans.length; i++) {
            const plan = plans[i]
            const benefits = await BenefitRepository.findAllByPlanId(plan.id)
            plans[i] = {...plan, benefits }
        }
        return plans
    }

    static async findById(id) {
        const plan = await super.findById(Plan, id)
        const benefits = await BenefitRepository.findAllByPlanId(id)
        return {...plan, benefits }
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