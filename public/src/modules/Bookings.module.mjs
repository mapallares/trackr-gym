import { API } from '../scripts/configs/api.config.mjs'
import Notify from '../scripts/utils/notify.mjs'

export class Bookings {

    static async bookings() {
        try {
            const token = localStorage.getItem('token') || ""
            const response = await fetch(API.BOOKINGS.ENDPOINTS.ALL, {
                method: 'GET',
                mode: 'no-cors',
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

}

export default Bookings