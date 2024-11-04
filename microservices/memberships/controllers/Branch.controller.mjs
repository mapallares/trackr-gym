import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import BranchService from '../services/Branch.service.mjs'
import BranchDTO from '../dtos/Branch.dto.mjs'
import { BranchNotFoundError } from '../errors/error/BranchNotFound.error.mjs'
import GymService from '../services/Gym.service.mjs'
import PlanService from '../services/Plan.service.mjs'
import { GymNotFoundError } from '../errors/error/GymNotFound.error.mjs'
import { PlanNotFoundError } from '../errors/error/PlanNotFound.error.mjs'

export class BranchController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const branches = await BranchService.findAllBranches()
            return response.status(200).json(branches.map(branch => new BranchDTO(branch)))
        })
    }

    static async getAllByGymId(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params

            Validator.required({ gymId })
            Validator.isUUID({ gymId })

            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            const branches = await BranchService.findAllBranchesByGymId(gymId)
            return response.status(200).json(branches.map(branch => new BranchDTO(branch)))
        })
    }

    static async getById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const branch = await BranchService.findBranchById(id)
            
            if(!branch) throw new BranchNotFoundError(`No existe una sucursal con id = '${id}'`)

            return response.status(200).json(new BranchDTO(branch))
        })
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params
            const { name, description, location } = request.body

            Validator.required({ gymId })
            Validator.isUUID({ gymId })

            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            Validator.required({ name, description, location })
            Validator.length({ name }, 2, 100)
            Validator.length({ description, location }, 2, 500)

            const branch = await BranchService.saveBranch({ name, description, location, gymId })

            return response.status(201).json(new BranchDTO(branch))
        }, ['Admin'])
    }

    static async putById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { name, description, location } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ name, description, location })
            Validator.length({ name }, 2, 100)
            Validator.length({ description, location }, 2, 500)

            const branch = await BranchService.updateBranchById(id, { name, description, location })
            if (!branch) throw new BranchNotFoundError(`La sucursal con id '${id}' no existe`)

            return response.status(200).json(new BranchDTO(branch))
        }, ['Admin'])
    }

    static async deleteById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const branch = await BranchService.findBranchById(id)
            if (!branch) throw new BranchNotFoundError(`La sucursal con id '${id}' no existe`)
            
            try {
                await BranchService.deleteBranchById(branch.id)
            } catch(error) {
                return response.status(202).json({ message: 'Sucursal no puede ser eliminada porque está relacionado con entidades activas' })
            }

            return response.status(200).json({ message: 'Sucursal eliminada con éxito' })       
        }, ['Admin'])
    }

    static async getAllByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId } = request.params

            Validator.required({ planId })
            Validator.isUUID({ planId })

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            const branches = await BranchService.findAllBranchesByPlanId(planId)
            return response.status(200).json(branches.map(branch => new BranchDTO(branch)))
        })
    }

    static async assignByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId, id } = request.params

            const branch = await BranchService.findBranchById(id)
            if (!branch) throw new BranchNotFoundError(`La sucursal con id '${id}' no existe`)

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            await BranchService.relatePlan(id, planId)
            
            return response.status(200).json({ message: 'Plan asignado a la sucursal correctamente' })
        }, ['Admin'])
    }

    static async revokeByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId, id } = request.params

            const branch = await BranchService.findBranchById(id)
            if (!branch) throw new BranchNotFoundError(`La sucursal con id '${id}' no existe`)

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            await BranchService.unrelatePlan(id, planId)
            
            return response.status(200).json({ message: 'Plan revocado de la sucursal correctamente' })
        }, ['Admin'])
    }

}

export default BranchController