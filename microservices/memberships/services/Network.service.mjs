import Service from './service/Service.mjs'
import NetworkRepository from '../repositories/Network.repository.mjs'
import { NetworkAlreadyExistError } from '../errors/error/NetworkAlreadyExist.error.mjs'
import { NetworkNotFoundError } from '../errors/error/NetworkNotFound.error.mjs'

export class NetworkService extends Service {

    static async findAllNetworks() {
        return await NetworkRepository.findAll()
    }
    
    static async findAllNetworksByGymId(gymId) {
        return await NetworkRepository.findAllByGymId(gymId)
    }

    static async findNetworkById(id) {
        return await NetworkRepository.findById(id)
    }

    static async saveNetwork(network) {
        let savedNetwork = null
        try {
            savedNetwork = await NetworkRepository.save(network)
        } catch(error) {
            console.log(error)
            throw new NetworkAlreadyExistError('No se puede crear la red social porque ya existe')
        }
        
        if(!savedNetwork) throw new NetworkNotFoundError('La red social no ha podido ser creada')

        return savedNetwork
    }

    static async updateNetworkById(id, network) {
        return await NetworkRepository.updateById(id, network)
    }

    static async deleteNetworkById(id) {
        return await NetworkRepository.deleteById(id)
    }

}

export default NetworkService