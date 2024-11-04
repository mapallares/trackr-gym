import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import ScheduleService from '../services/Schedule.service.mjs'
import ScheduleDTO from '../dtos/Schedule.dto.mjs'
import { ScheduleNotFoundError } from '../errors/error/ScheduleNotFound.error.mjs'
import BranchService from '../services/Branch.service.mjs'
import { BranchNotFoundError } from '../errors/error/BranchNotFound.error.mjs'

export class ScheduleController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const schedules = await ScheduleService.findAllSchedules()
            return response.status(200).json(schedules.map(schedule => new ScheduleDTO(schedule)))
        })
    }

    static async getAllByBranchId(request, response) {
        super.process(request, response, async () => {
            const { branchId } = request.params

            Validator.required({ branchId })
            Validator.isUUID({ branchId })

            const branch = await BranchService.findBranchById(branchId)
            if (!branch) throw new BranchNotFoundError(`La sucursal con id '${branchId}' no existe`)

            const schedules = await ScheduleService.findAllSchedulesByBranchId(branchId)
            return response.status(200).json(schedules.map(schedule => new ScheduleDTO(schedule)))
        })
    }

    static async getById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const schedule = await ScheduleService.findScheduleById(id)
            
            if(!schedule) throw new ScheduleNotFoundError(`No existe un horario con id = '${id}'`)

            return response.status(200).json(new ScheduleDTO(schedule))
        })
    }

    static async postOne(request, response) {
        super.process(request, response, async () => {
            const { branchId } = request.params
            const { type, description, day, startTime, endTime, isRecurrent, isAppliesOnHolidays } = request.body

            Validator.required({ branchId })
            Validator.isUUID({ branchId })

            const branch = await BranchService.findBranchById(branchId)
            if (!branch) throw new BranchNotFoundError(`La sucursal con id '${branchId}' no existe`)

            Validator.required({ type, description, day, startTime, endTime, isRecurrent, isAppliesOnHolidays })
            Validator.length({ type, day }, 2, 100)
            Validator.length({ description }, 2, 500)
            Validator.isBoolean({ isRecurrent, isAppliesOnHolidays })
            Validator.isTime({ startTime, endTime })

            const schedule = await ScheduleService.saveSchedule({ type, description, day, startTime, endTime, isRecurrent, isAppliesOnHolidays, branchId })

            return response.status(201).json(new ScheduleDTO(schedule))
        }, ['Admin'])
    }

    static async putById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { type, description, day, startTime, endTime, isRecurrent, isAppliesOnHolidays } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ type, description, day, startTime, endTime, isRecurrent, isAppliesOnHolidays })
            Validator.length({ type, day }, 2, 100)
            Validator.length({ description, location }, 2, 500)
            Validator.isBoolean({ isRecurrent, isAppliesOnHolidays })
            Validator.isTime({ startTime, endTime })

            const schedule = await ScheduleService.updateScheduleById(id, { type, description, day, startTime, endTime, isRecurrent, isAppliesOnHolidays })
            if (!schedule) throw new ScheduleNotFoundError(`El horario con id '${id}' no existe`)

            return response.status(200).json(new ScheduleDTO(schedule))
        }, ['Admin'])
    }

    static async deleteById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })
            
            const schedule = await ScheduleService.findScheduleById(id)
            if (!schedule) throw new ScheduleNotFoundError(`El horario con id '${id}' no existe`)
            
            try {
                await ScheduleService.deleteScheduleById(schedule.id)
            } catch(error) {
                return response.status(202).json({ message: 'Horario no puede ser eliminado porque está relacionado con entidades activas' })
            }

            return response.status(200).json({ message: 'Horario eliminado con éxito' })       
        }, ['Admin'])
    }

}

export default ScheduleController