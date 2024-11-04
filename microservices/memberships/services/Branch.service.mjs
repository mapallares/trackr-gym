import Service from './service/Service.mjs'
import BranchRepository from '../repositories/Branch.repository.mjs'
import { BranchAlreadyExistError } from '../errors/error/BranchAlreadyExist.error.mjs'
import { BranchNotFoundError } from '../errors/error/BranchNotFound.error.mjs'
import { AlreadyExistError } from '../errors/error/AlreadyExist.error.mjs'
import { NotFoundError } from '../errors/error/NotFound.error.mjs'

export class BranchService extends Service {

    static async findAllBranches() {
        return await BranchRepository.findAll()
    }
    
    static async findAllBranchesByGymId(gymId) {
        return await BranchRepository.findAllByGymId(gymId)
    }

    static async findAllBranchesByPlanId(planId) {
        return await BranchRepository.findAllByPlanId(planId)
    }

    static async findBranchById(id) {
        return await BranchRepository.findById(id)
    }

    static async saveBranch(branch) {
        let savedBranch = null
        try {
            savedBranch = await BranchRepository.save(branch)
        } catch(error) {
            console.log(error)
            throw new BranchAlreadyExistError('No se puede crear la sucursal porque ya existe')
        }
        
        if(!savedBranch) throw new BranchNotFoundError('La sucursal no ha podido ser creada')

        return savedBranch
    }

    static async updateBranchById(id, branch) {
        return await BranchRepository.updateById(id, branch)
    }

    static async deleteBranchById(id) {
        return await BranchRepository.deleteById(id)
    }

    static async relatePlan(branchId, planId) {
        if(await this.existsPlan(planId, branchId)) throw new AlreadyExistError('El plan ya está relacionado con la sucursal')
        return await BranchRepository.relatePlan(branchId, planId)
    }

    static async unrelatePlan(branchId, planId) {
        if(!await this.existsPlan(planId, branchId)) throw new NotFoundError('El plan no está relacionado con la sucursal')
        return await BranchRepository.unrelatePlan(branchId, planId)  
    }

    static async existsPlan(planId, branchId) {
        const planBranch = await BranchRepository.findPlanBranch(planId, branchId)
        console.log(planBranch)
        return planBranch[0] ? true : false
    }
}

export default BranchService