import Controller from './controller/Controller.mjs'
import Validator from './validator/Validator.mjs'
import MembershipService from '../services/Membership.service.mjs'
import MembershipDTO from '../dtos/Membership.dto.mjs'
import { MembershipNotFoundError } from '../errors/error/MembershipNotFound.error.mjs'
import PlanService from '../services/Plan.service.mjs'
import { PlanNotFoundError } from '../errors/error/PlanNotFound.error.mjs'
import { NotFoundError } from '../errors/error/NotFound.error.mjs'

export class MembershipController extends Controller {

    static async getAll(request, response) {
        super.process(request, response, async () => {
            const memberships = await MembershipService.findAllMemberships()
            return response.status(200).json(memberships.map(membership => new MembershipDTO(membership)))
        }, ['Admin'])
    }

    static async getById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })

            const membership = await MembershipService.findMembershipById(id)
            if(!membership) throw new MembershipNotFoundError(`No existe una membresía con id = '${id}'`)

            return response.status(200).json(new MembershipDTO(membership))
        })
    }

    static async getAllActivated(request, response) {
        super.process(request, response, async () => {
            const memberships = await MembershipService.findAllMemberships()
            return response.status(200).json(memberships.filter(membership => membership.isActive && ['Created', 'Activated', 'Renewed'].includes(membership.status))
            .map(membership => new MembershipDTO(membership)))
        }, ['Admin'])
    }

    static async getAllExpired(request, response) {
        super.process(request, response, async () => {
            const memberships = await MembershipService.findAllMemberships()
            return response.status(200).json(memberships.filter(membership => !membership.isActive && ['Expired'].includes(membership.status))
            .map(membership => new MembershipDTO(membership)))
        }, ['Admin'])
    }

    static async getAllSuspended(request, response) {
        super.process(request, response, async () => {
            const memberships = await MembershipService.findAllMemberships()
            return response.status(200).json(memberships.filter(membership => !membership.isActive && ['Suspended'].includes(membership.status))
            .map(membership => new MembershipDTO(membership)))        
        }, ['Admin'])
    }

    static async getAllCancelled(request, response) {
        super.process(request, response, async () => {
            const memberships = await MembershipService.findAllMemberships()
            return response.status(200).json(memberships.filter(membership => membership.isCancelled || ['Cancelled'].includes(membership.status))
            .map(membership => new MembershipDTO(membership)))        
        }, ['Admin'])
    }

    static async getAllDeleted(request, response) {
        super.process(request, response, async () => {
            const memberships = await MembershipService.findAllMemberships()
            return response.status(200).json(memberships.filter(membership => !membership.isActive && ['Deleted'].includes(membership.status))
            .map(membership => new MembershipDTO(membership)))        
        }, ['Admin'])
    }

    static async getAllRenewed(request, response) {
        super.process(request, response, async () => {
            const memberships = await MembershipService.findAllMemberships()
            return response.status(200).json(memberships.filter(membership => membership.wasRenewed || ['Renewed'].includes(membership.status))
            .map(membership => new MembershipDTO(membership)))        
        }, ['Admin'])
    }

    static async postNewByPlanId(request, response) {
        super.process(request, response, async () => {
            const { planId } = request.params
            const { userId, paymentId, purchaseDate, expirationDate, paymentDueDate } = request.body

            Validator.required({ planId })
            Validator.isUUID({ planId })

            const plan = await PlanService.findPlanById(planId)
            if (!plan) throw new PlanNotFoundError(`El plan con id '${planId}' no existe`)

            Validator.required({ userId, paymentId, purchaseDate, expirationDate, paymentDueDate })
            Validator.isUUID({ userId, paymentId })
            Validator.isDate({ purchaseDate, expirationDate, paymentDueDate })

            const membership = await MembershipService.saveMembership({ userId, planId, paymentId, purchaseDate, expirationDate, paymentDueDate })

            await MembershipService.relateUser(membership.id, userId)

            return response.status(201).json(new MembershipDTO(membership))
        })
    }

    static async patchRenewById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { paymentId, purchaseDate, expirationDate, paymentDueDate } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ paymentId, purchaseDate, expirationDate, paymentDueDate })
            Validator.isUUID({ paymentId })
            Validator.isDate({ purchaseDate, expirationDate, paymentDueDate })

            const membership = await MembershipService.updateMembershipById(id, { paymentId, purchaseDate, expirationDate, paymentDueDate, wasRenewed: true, isActive: true, isCancelled: false, status: 'Renewed', updatedAt: 'now()', updatedBy: request.user.email })
            if (!membership) throw new MembershipNotFoundError(`La membresía con id '${id}' no existe`)

            return response.status(200).json(new MembershipDTO(membership))
        })
    }

    static async patchCancelById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params

            Validator.required({ id })
            Validator.isUUID({ id })

            const membership = await MembershipService.updateMembershipById(id, { wasRenewed: false, isActive: false, isCancelled: true, status: 'Cancelled', updatedAt: 'now()', updatedBy: request.user.email })
            if (!membership) throw new MembershipNotFoundError(`La membresía con id '${id}' no existe`)

            return response.status(200).json(new MembershipDTO(membership))
        })
    }

    static async putById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            const { userId, paymentId, purchaseDate, expirationDate, paymentDueDate, status } = request.body

            Validator.required({ id })
            Validator.isUUID({ id })

            Validator.required({ userId, paymentId, purchaseDate, expirationDate, paymentDueDate })
            Validator.isUUID({ userId, paymentId })
            Validator.isDate({ purchaseDate, expirationDate, paymentDueDate })
            Validator.length({ status }, 2, 500)

            const membership = await MembershipService.updateMembershipById(id, { userId, paymentId, purchaseDate, expirationDate, paymentDueDate, status })
            if (!membership) throw new MembershipNotFoundError(`La membresía con id '${id}' no existe`)

            return response.status(200).json(new MembershipDTO(membership))
        }, ['Admin'])
    }

    static async deleteById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            
            Validator.required({ id })
            Validator.isUUID({ id })
            
            const membership = await MembershipService.findMembershipById(id)
            if (!membership) throw new MembershipNotFoundError(`La membresía con id '${id}' no existe`)
            
            try {
                await MembershipService.deleteMembershipById(membership.id)
            } catch(error) {
                return response.status(202).json({ message: 'Membresía no puede ser eliminada porque está relacionado con entidades activas' })
            }

            return response.status(200).json({ message: 'Membresía eliminada con éxito' })       
        })
    }

    static async getAllUsersMembershipsById(request, response) {
        super.process(request, response, async () => {
            const { id } = request.params
            
            Validator.required({ id })
            Validator.isUUID({ id })

            const membership = await MembershipService.findMembershipById(id)
            if (!membership) throw new MembershipNotFoundError(`La membresía con id '${id}' no existe`)

            const usersMemberships = await MembershipService.findAllUsersMembershipsById(id)

            return response.status(200).json(usersMemberships)       
        })
    }

    static async assignByUserId(request, response) {
        super.process(request, response, async () => {
            const { id, userId } = request.params
            
            Validator.required({ id, userId })
            Validator.isUUID({ id, userId })

            const membership = await MembershipService.findMembershipById(id)
            if (!membership) throw new MembershipNotFoundError(`La membresía con id '${id}' no existe`)

            const plan = await PlanService.findPlanById(membership.planId)

            const usersMemberships = await MembershipService.findAllUsersMembershipsById(id)
            if(usersMemberships.length >= plan.ability) throw new NotFoundError('La membresía ha alcanzado el número máximo de usuarios')

            await MembershipService.relateUser(id, userId)

            return response.status(200).json({ message: 'Usuario asignado con éxito a la membresía' })       
        })
    }

    static async revokeByUserId(request, response) {
        super.process(request, response, async () => {
            const { id, userId } = request.params
            
            Validator.required({ id, userId })
            Validator.isUUID({ id, userId })

            const membership = await MembershipService.findMembershipById(id)
            if (!membership) throw new MembershipNotFoundError(`La membresía con id '${id}' no existe`)

            await MembershipService.unrelateUser(id, userId)

            return response.status(200).json({ message: 'Usuario revocado con éxito de la membresía' })       
        })
    }

    static async getAllByUserId(request, response) {
        super.process(request, response, async () => {
            const { userId } = request.params

            Validator.required({ userId })
            Validator.isUUID({ userId })

            const memberships = await MembershipService.findAllMembershipsByUserId(userId)

            return response.status(200).json(memberships.map(membership => new MembershipDTO(membership)))
        })
    }

}

export default MembershipController