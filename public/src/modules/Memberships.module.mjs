import { API } from '../scripts/configs/api.config.mjs'
import Notify from '../scripts/utils/notify.mjs'

export class Memberships {

    static async new(planId, membership) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.NEW + `/${planId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify(membership)
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async gyms() {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.GYMS, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async gym(id) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.GYMS + `/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async plans(gymId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.GYMS + `/${gymId}/plans`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async plan(planId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.PLANS + `/${planId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow'
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async createPlan(gymId, plan) {
        const { name, type, description, price, ability } = plan
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.GYMS + `/${gymId}/plans`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({ name, 
                type, 
                description, 
                price, 
                ability 
            })
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async editPlan(planId, plan) {
        const { name, type, description, price, ability } = plan
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.PLANS + `/${planId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({ name, 
                type, 
                description, 
                price, 
                ability 
            })
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async deletePlan(planId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.PLANS + `/${planId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow'
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async branch(branchId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.BRANCHES + `/${branchId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async memberships(userId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.USERS + `/${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async createMembership(planId, membership) {
        const { userId, paymentId, purchaseDate, expirationDate, paymentDueDate } = membership
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.NEW + `/${planId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({
                userId,
                paymentId,
                purchaseDate,
                expirationDate,
                paymentDueDate
            })
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async allMemberships() {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.ALL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async benefits(gymId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.GYMS + `/${gymId}/benefits`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async createBenefit(gymId, benefit) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.GYMS + `/${gymId}/benefits`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify(benefit)
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async deleteBenefit(benefitId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.BENEFITS + `/${benefitId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow'
        })
        const content = await response.json()
        if (response.ok) {
            return true
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async assignBenefit(planId, benefitId, isApplicable) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.PLANS + `/${planId}/benefits/${benefitId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({ isApplicable: isApplicable })
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async revokeBenefit(planId, benefitId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.MEMBERSHIPS.ENDPOINTS.PLANS + `/${planId}/benefits/${benefitId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow'
        })
        const content = await response.json()
        if (response.ok) {
            return content
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

}

export default Memberships