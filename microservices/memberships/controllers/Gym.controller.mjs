import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import GymService from '../services/Gym.service.mjs'
import GymDTO from '../dtos/Gym.dto.mjs'
import { GymNotFoundError } from '../errors/error/GymNotFound.error.mjs'

export class GymController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const gyms = await GymService.findAllGyms()
            return response.status(200).json(gyms.map(gym => new GymDTO(gym)))
        })
    }

    static async getById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })

            const gym = await GymService.findGymById(id)
            if(!gym) throw new GymNotFoundError(`No existe un gimnasio con id = '${id}'`)

            return response.status(200).json(new GymDTO(gym))
        })
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { name, slogan, nit, type, adress, phone, email, foundedIn } = request.body

            Validator.required({ name, slogan, nit, type, adress, phone, email, foundedIn })
            Validator.length({ name, type, phone }, 2, 100)
            Validator.length({ slogan, adress }, 2, 500)
            Validator.email({ email })
            Validator.length({ nit }, 5, 15)
            Validator.isDate({ foundedIn })

            const gym = await GymService.saveGym({ name, slogan, nit, type, adress, phone, email, foundedIn })

            return response.status(201).json(new GymDTO(gym))
        }, ['Admin'])
    }

    static async putById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { name, slogan, nit, type, adress, phone, email, foundedIn } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ name, slogan, nit, type, adress, phone, email, foundedIn })
            Validator.length({ name, type, phone }, 2, 100)
            Validator.length({ slogan, adress }, 2, 500)
            Validator.email({ email })
            Validator.length({ nit }, 5, 15)
            Validator.isDate({ foundedIn })

            const gym = await GymService.updateGymById(id, { name, slogan, nit, type, adress, phone, email, foundedIn })
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${id}' no existe`)

            return response.status(200).json(new GymDTO(gym))
        }, ['Admin'])
    }

    static async deleteById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            
            Validator.required({ id })
            Validator.isUUID({ id })
            
            const gym = await GymService.findGymById(id)
            if (!gym) throw new GymNotFoundError(`El gimnasio con id '${id}' no existe`)
            
            try {
                await GymService.deleteGymById(gym.id)
            } catch(error) {
                return response.status(202).json({ message: 'Gimnasio no puede ser eliminado porque está relacionado con entidades activas' })
            }

            return response.status(200).json({ message: 'Gimnasio eliminado con éxito' })       
        }, ['Admin'])
    }

}

export default GymController