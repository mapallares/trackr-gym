import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import BenefitService from '../services/Benefit.service.mjs'
import PlanService from '../services/Plan.service.mjs'
import BenefitDTO from '../dtos/Benefit.dto.mjs'
import { BenefitNotFoundError } from '../errors/error/BenefitNotFound.error.mjs'
import GymService from '../services/Gym.service.mjs'
import { GymNotFoundError } from '../errors/error/GymNotFound.error.mjs'
import { PlanNotFoundError } from '../errors/error/PlanNotFound.error.mjs'

export class BenefitController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const benefits = await BenefitService.findAllBenefits()
            return response.status(200).json(benefits.map(benefit => new BenefitDTO(benefit)))
        })
    }

    static async getAllByGymId(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params

            Validator.required({ gymId })
            Validator.isUUID({ gymId })

            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            const benefits = await BenefitService.findAllBenefitsByGymId(gymId)
            return response.status(200).json(benefits.map(benefit => new BenefitDTO(benefit)))
        })
    }

    static async getById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const benefit = await BenefitService.findBenefitById(id)
            
            if(!benefit) throw new BenefitNotFoundError(`No existe un beneficio con id = '${id}'`)

            return response.status(200).json(new BenefitDTO(benefit))
        })
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params
            const { name, description, type } = request.body

            Validator.required({ gymId })
            Validator.isUUID({ gymId })
            
            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            Validator.required({ name, description, type })
            Validator.length({ name, type }, 2, 100)
            Validator.length({ description }, 2, 500)

            const benefit = await BenefitService.saveBenefit({ name, description, type, gymId })

            return response.status(201).json(new BenefitDTO(benefit))
        }, ['Admin'])
    }

    static async putById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { name, description, type } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ name, description, type })
            Validator.length({ name, type }, 2, 100)
            Validator.length({ description }, 2, 500)

            const benefit = await BenefitService.updateBenefitById(id, { name, description, type })
            if (!benefit) throw new BenefitNotFoundError(`El beneficio con id '${id}' no existe`)

            return response.status(200).json(new BenefitDTO(benefit))
        }, ['Admin'])
    }

    static async deleteById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const benefit = await BenefitService.findBenefitById(id)
            if (!benefit) throw new BenefitNotFoundError(`El beneficio con id '${id}' no existe`)
            
            try {
                await BenefitService.deleteBenefitById(benefit.id)
            } catch(error) {
                return response.status(202).json({ message: 'Beneficio no puede ser eliminado porque está relacionado con entidades activas' })
            }

            return response.status(200).json({ message: 'Beneficio eliminado con éxito' })       
        }, ['Admin'])
    }

    static async getAllByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId } = request.params

            Validator.required({ planId })
            Validator.isUUID({ planId })

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            const benefits = await BenefitService.findAllBenefitsByPlanId(planId)
            return response.status(200).json(benefits)
        })
    }

    static async assignByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId, id } = request.params
            const { isApplicable } = request.body

            Validator.required({ isApplicable })
            Validator.isBoolean({ isApplicable })

            const benefit = await BenefitService.findBenefitById(id)
            if (!benefit) throw new BenefitNotFoundError(`El beneficio con id '${id}' no existe`)

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            await BenefitService.relatePlan(id, planId, isApplicable)
            
            return response.status(200).json({ message: 'Beneficio asignado al plan correctamente' })
        }, ['Admin'])
    }

    static async modifyAssignmentByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId, id } = request.params
            const { isApplicable } = request.body

            Validator.required({ isApplicable })
            Validator.isBoolean({ isApplicable })

            const benefit = await BenefitService.findBenefitById(id)
            if (!benefit) throw new BenefitNotFoundError(`El beneficio con id '${id}' no existe`)

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            await BenefitService.modifyRelationPlan(id, planId, isApplicable)
            
            return response.status(200).json({ message: 'Asignación de beneficio a plan modificada correctamente' })
        }, ['Admin'])
    }

    static async revokeByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId, id } = request.params

            const benefit = await BenefitService.findBenefitById(id)
            if (!benefit) throw new BenefitNotFoundError(`El beneficio con id '${id}' no existe`)

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            await BenefitService.unrelatePlan(id, planId)
            
            return response.status(200).json({ message: 'Beneficio revocado del plan correctamente' })
        }, ['Admin'])
    }

}

export default BenefitController