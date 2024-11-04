import Service from './service/Service.mjs'
import BenefitRepository from '../repositories/Benefit.repository.mjs'
import { BenefitAlreadyExistError } from '../errors/error/BenefitAlreadyExist.error.mjs'
import { BenefitNotFoundError } from '../errors/error/BenefitNotFound.error.mjs'
import { AlreadyExistError } from '../errors/error/AlreadyExist.error.mjs'
import { NotFoundError } from '../errors/error/NotFound.error.mjs'

export class BenefitService extends Service {

    static async findAllBenefits() {
        return await BenefitRepository.findAll()
    }
    
    static async findAllBenefitsByGymId(gymId) {
        return await BenefitRepository.findAllByGymId(gymId)
    }

    static async findAllBenefitsByPlanId(planId) {
        return await BenefitRepository.findAllByPlanId(planId)
    }

    static async findBenefitById(id) {
        return await BenefitRepository.findById(id)
    }

    static async saveBenefit(benefit) {
        let savedBenefit = null
        try {
            savedBenefit = await BenefitRepository.save(benefit)
        } catch(error) {
            console.log(error)
            throw new BenefitAlreadyExistError('No se puede crear el beneficio porque ya existe')
        }
        
        if(!savedBenefit) throw new BenefitNotFoundError('El beneficio no ha podido ser creado')

        return savedBenefit
    }

    static async updateBenefitById(id, benefit) {
        return await BenefitRepository.updateById(id, benefit)
    }

    static async deleteBenefitById(id) {
        return await BenefitRepository.deleteById(id)
    }

    static async relatePlan(benefitId, planId, isApplicable) {
        if(await this.existsPlan(planId, benefitId)) throw new AlreadyExistError('El beneficio ya está relacionado con el plan')
        return await BenefitRepository.relatePlan(benefitId, planId, isApplicable)
    }

    static async modifyRelationPlan(benefitId, planId, isApplicable) {
        if(!await this.existsPlan(planId, benefitId)) throw new NotFoundError('El beneficio no está relacionado con el plan')
        return await BenefitRepository.modifyRelationPlan(benefitId, planId, isApplicable)
    }

    static async unrelatePlan(benefitId, planId) {
        if(!await this.existsPlan(planId, benefitId)) throw new NotFoundError('El beneficio no está relacionado con el plan')
        return await BenefitRepository.unrelatePlan(benefitId, planId)  
    }

    static async existsPlan(planId, benefitId) {
        const planBenefit = await BenefitRepository.findPlanBenefit(planId, benefitId)
        return planBenefit[0] ? true : false
    }

}

export default BenefitService