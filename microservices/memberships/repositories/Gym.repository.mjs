import Repository from './repository/Repository.mjs'
import Gym from '../entities/Gym.entity.mjs'
import PlanRepository from './Plan.repository.mjs'
import BranchRepository from './Branch.repository.mjs'
import NetworkRepository from './Network.repository.mjs'
import BenefitRepository from './Benefit.repository.mjs'

export class GymRepository extends Repository {

    static async findAll() {
        let gyms = await super.findAll(Gym)
        for(let i = 0; i < gyms.length; i++) {
            const gym = gyms[i]
            const branches = await BranchRepository.findAllByGymId(gym.id)
            const networks = await NetworkRepository.findAllByGymId(gym.id)
            const benefits = await BenefitRepository.findAllByGymId(gym.id)
            const plans = await PlanRepository.findAllByGymId(gym.id)
            gyms[i] = {...gym, branches, networks, benefits, plans }
        }
        return gyms
    }

    static async findById(id) {
        const gym = await super.findById(Gym, id)
        const branches = await BranchRepository.findAllByGymId(id)
        const networks = await NetworkRepository.findAllByGymId(id)
        const benefits = await BenefitRepository.findAllByGymId(gym.id)
        const plans = await PlanRepository.findAllByGymId(id)
        return {...gym, branches, networks, benefits, plans }
    }

    static async save(gym) {
        return await super.saveAll(Gym, gym)
    }

    static async updateById(id, gym) {
        return await super.updateById(Gym, id, gym)
    }

    static async deleteById(id) {
        return await super.deleteById(Gym, id)
    }

}

export default GymRepository