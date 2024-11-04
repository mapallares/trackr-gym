import Service from './service/Service.mjs'
import PlanRepository from '../repositories/Plan.repository.mjs'
import { PlanAlreadyExistError } from '../errors/error/PlanAlreadyExist.error.mjs'
import { PlanNotFoundError } from '../errors/error/PlanNotFound.error.mjs'

export class PlanService extends Service {

    static async findAllPlans() {
        return await PlanRepository.findAll()
    }
    
    static async findAllPlansByGymId(gymId) {
        return await PlanRepository.findAllByGymId(gymId)
    }

    static async findPlanById(id) {
        return await PlanRepository.findById(id)
    }

    static async savePlan(plan) {
        let savedPlan = null
        try {
            savedPlan = await PlanRepository.save(plan)
        } catch(error) {
            console.log(error)
            throw new PlanAlreadyExistError('No se puede crear el plan porque ya existe')
        }
        
        if(!savedPlan) throw new PlanNotFoundError('El plan no ha podido ser creado')

        return savedPlan
    }

    static async updatePlanById(id, plan) {
        return await PlanRepository.updateById(id, plan)
    }

    static async deletePlanById(id) {
        return await PlanRepository.deleteById(id)
    }

}

export default PlanService