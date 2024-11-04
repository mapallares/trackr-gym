import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import PlanService from '../services/Plan.service.mjs'
import PlanDTO from '../dtos/Plan.dto.mjs'
import { PlanNotFoundError } from '../errors/error/PlanNotFound.error.mjs'
import GymService from '../services/Gym.service.mjs'
import { GymNotFoundError } from '../errors/error/GymNotFound.error.mjs'

export class PlanController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const plans = await PlanService.findAllPlans()
            return response.status(200).json(plans.map(plan => new PlanDTO(plan)))
        })
    }

    static async getAllByGymId(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params

            Validator.required({ gymId })
            Validator.isUUID({ gymId })

            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            const plans = await PlanService.findAllPlansByGymId(gymId)
            return response.status(200).json(plans.map(plan => new PlanDTO(plan)))
        })
    }

    static async getById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const plan = await PlanService.findPlanById(id)
            
            if(!plan) throw new PlanNotFoundError(`No existe un plan con id = '${id}'`)

            return response.status(200).json(new PlanDTO(plan))
        })
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params
            const { name, description, type, price, ability } = request.body

            Validator.required({ gymId })
            Validator.isUUID({ gymId })

            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            Validator.required({ name, description, type, price, ability })
            Validator.length({ name, type }, 2, 100)
            Validator.length({ description }, 2, 500)
            Validator.isNumeric({ price })
            Validator.isInteger({ ability })

            const plan = await PlanService.savePlan({ name, description, type, price, ability, gymId })

            return response.status(201).json(new PlanDTO(plan))
        }, ['Admin'])
    }

    static async putById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { name, description, type, price, ability } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ name, description, type, price, ability })
            Validator.length({ name, type }, 2, 100)
            Validator.length({ description }, 2, 500)
            Validator.isNumeric({ price })
            Validator.isInteger({ ability })

            const plan = await PlanService.updatePlanById(id, { name, description, type, price, ability })
            if (!plan) throw new PlanNotFoundError(`El plan con id '${id}' no existe`)

            return response.status(200).json(new PlanDTO(plan))
        }, ['Admin'])
    }

    static async deleteById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const plan = await PlanService.findPlanById(id)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${id}' no existe`)
            
            try {
                await PlanService.deletePlanById(plan.id)
            } catch(error) {
                return response.status(202).json({ message: 'Plan no puede ser eliminado porque está relacionado con entidades activas' })
            }

            return response.status(200).json({ message: 'Plan eliminado con éxito' })       
        }, ['Admin'])
    }

}

export default PlanController