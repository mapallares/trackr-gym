import Service from './service/Service.mjs'
import GymRepository from '../repositories/Gym.repository.mjs'
import { GymAlreadyExistError } from '../errors/error/GymAlreadyExist.error.mjs'
import { GymNotFoundError } from '../errors/error/GymNotFound.error.mjs'

export class GymService extends Service {
    
    static async findAllGyms() {
        return await GymRepository.findAll()
    }

    static async findGymById(id) {
        return await GymRepository.findById(id)
    }

    static async saveGym(gym) {
        let savedGym = null
        try {
            savedGym = await GymRepository.save(gym)
        } catch(error) {
            console.log(error)
            throw new GymAlreadyExistError('No se puede crear el gimnasio porque ya existe')
        }
        
        if(!savedGym) throw new GymNotFoundError('El gimnasio no ha podido ser creado')

        return savedGym
    }

    static async updateGymById(id, gym) {
        return await GymRepository.updateById(id, gym)
    }

    static async deleteGymById(id) {
        return await GymRepository.deleteById(id)
    }

}

export default GymService