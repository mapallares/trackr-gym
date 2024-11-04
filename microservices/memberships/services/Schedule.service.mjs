import Service from './service/Service.mjs'
import ScheduleRepository from '../repositories/Schedule.repository.mjs'
import { ScheduleAlreadyExistError } from '../errors/error/ScheduleAlreadyExist.error.mjs'
import { ScheduleNotFoundError } from '../errors/error/ScheduleNotFound.error.mjs'

export class ScheduleService extends Service {

    static async findAllSchedules() {
        return await ScheduleRepository.findAll()
    }
    
    static async findAllSchedulesByBranchId(branchId) {
        return await ScheduleRepository.findAllByBranchId(branchId)
    }

    static async findScheduleById(id) {
        return await ScheduleRepository.findById(id)
    }

    static async saveSchedule(schedule) {
        let savedSchedule = null
        try {
            savedSchedule = await ScheduleRepository.save(schedule)
        } catch(error) {
            console.log(error)
            throw new ScheduleAlreadyExistError('No se puede crear el horario porque ya existe')
        }
        
        if(!savedSchedule) throw new ScheduleNotFoundError('El horario no ha podido ser creado')

        return savedSchedule
    }

    static async updateScheduleById(id, schedule) {
        return await ScheduleRepository.updateById(id, schedule)
    }

    static async deleteScheduleById(id) {
        return await ScheduleRepository.deleteById(id)
    }

}

export default ScheduleService