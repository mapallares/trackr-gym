import Gym from '../entities/Gym.entity.mjs'
import Repository from './repository/Repository.mjs'

export class GymRepository extends Repository {

    static async findAll() {
        return await super.findAll(Gym)
    }

    static async findById(id) {
        return await super.findById(Gym, id)
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