import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import NetworkService from '../services/Network.service.mjs'
import NetworkDTO from '../dtos/Network.dto.mjs'
import { NetworkNotFoundError } from '../errors/error/NetworkNotFound.error.mjs'
import GymService from '../services/Gym.service.mjs'
import { GymNotFoundError } from '../errors/error/GymNotFound.error.mjs'

export class NetworkController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const networks = await NetworkService.findAllNetworks()
            return response.status(200).json(networks.map(network => new NetworkDTO(network)))
        })
    }

    static async getAllByGymId(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params

            Validator.required({ gymId })
            Validator.isUUID({ gymId })

            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            const networks = await NetworkService.findAllNetworksByGymId(gymId)
            return response.status(200).json(networks.map(network => new NetworkDTO(network)))
        })
    }

    static async getById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const network = await NetworkService.findNetworkById(id)
            
            if(!network) throw new NetworkNotFoundError(`No existe una red social con id = '${id}'`)

            return response.status(200).json(new NetworkDTO(network))
        })
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { gymId } = request.params
            const { name, description, label, profile, link } = request.body

            Validator.required({ gymId })
            Validator.isUUID({ gymId })

            const gym = await GymService.findGymById(gymId)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${gymId}' no existe`)

            Validator.required({ name, description, label, profile, link })
            Validator.length({ name, label, profile }, 2, 100)
            Validator.length({ description }, 2, 500)
            Validator.isUrl({ link })

            const network = await NetworkService.saveNetwork({ name, description, label, profile, link, gymId })

            return response.status(201).json(new NetworkDTO(network))
        }, ['Admin'])
    }

    static async putById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { name, description, label, profile, link } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ name, description, label, profile, link })
            Validator.length({ name, label, profile }, 2, 100)
            Validator.length({ description }, 2, 500)
            Validator.isUrl({ link })

            const network = await NetworkService.updateNetworkById(id, { name, description, label, profile, link })
            if (!network) throw new NetworkNotFoundError(`La red social con id '${id}' no existe`)

            return response.status(200).json(new NetworkDTO(network))
        }, ['Admin'])
    }

    static async deleteById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const network = await NetworkService.findNetworkById(id)
            if (!network) throw new NetworkNotFoundError(`La red social con id '${id}' no existe`)
            
            try {
                await NetworkService.deleteNetworkById(network.id)
            } catch(error) {
                return response.status(202).json({ message: 'Red social no puede ser eliminada porque está relacionado con entidades activas' })
            }

            return response.status(200).json({ message: 'Red social eliminada con éxito' })       
        }, ['Admin'])
    }

}

export default NetworkController