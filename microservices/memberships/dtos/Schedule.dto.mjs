import DTO from './dto/DTO.mjs'
import Schedule from '../entities/Schedule.entity.mjs'

export class ScheduleDTO extends DTO {

    constructor(schedule) {
        super(Schedule, schedule, ['createdAt', 'createdBy', 'updatedAt', 'updatedBy'])
    }

}

export default ScheduleDTO