import { API } from '../scripts/configs/api.config.mjs'
import Notify from '../scripts/utils/notify.mjs'

export class Bookings {

    static async services() {
        try {
            const token = localStorage.getItem('token') || ""
            const response = await fetch(API.BOOKINGS.ENDPOINTS.SERVICES, {
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
        catch(error) {
            Notify.notice('A ocurrido un error al intentar comunicarse con el servidor', 'error')
        }
    }

    static async activities() {
        try {
            const token = localStorage.getItem('token') || ""
            const response = await fetch(API.BOOKINGS.ENDPOINTS.ACTIVITIES, {
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
        catch(error) {
            Notify.notice('A ocurrido un error al intentar comunicarse con el servidor', 'error')
        }
    }

    static async bookings() {
        try {
            const token = localStorage.getItem('token') || ""
            const response = await fetch(API.BOOKINGS.ENDPOINTS.ALL, {
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
        catch(error) {
            Notify.notice('A ocurrido un error al intentar comunicarse con el servidor', 'error')
        }
    }

    static async createBooking(activityId, booking) {
        try {
            const token = localStorage.getItem('token') || ""
            const response = await fetch(API.BOOKINGS.ENDPOINTS.ACTIVITIES + `/${activityId}/bookings`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                redirect: 'follow',
                body: JSON.stringify(booking)
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
        catch(error) {
            Notify.notice('A ocurrido un error al intentar comunicarse con el servidor', 'error')
        }
    }

}

export default Bookings
