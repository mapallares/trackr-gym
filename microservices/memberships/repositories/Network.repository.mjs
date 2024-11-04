import Network from '../entities/Network.entity.mjs'
import Repository from './repository/Repository.mjs'

export class NetworkRepository extends Repository {

    static async findAll() {
        return super.findAll(Network)
    }

    static async findAllByGymId(gymId) {
        return await super.findAllByColumn(Network, { gymId })
    }

    static async findById(id) {
        return await super.findById(Network, id)
    }

    static async save(network) {
        return await super.saveAll(Network, network)
    }

    static async updateById(id, network) {
        return await super.updateById(Network, id, network)
    }

    static async deleteById(id) {
        return await super.deleteById(Network, id)
    }

}

export default NetworkRepository