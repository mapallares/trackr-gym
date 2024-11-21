import { API } from '../scripts/configs/api.config.mjs'
import Notify from '../scripts/utils/notify.mjs'

export class Inventory {

    static async products() {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.INVENTORY.ENDPOINTS.PRODUCTS, {
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

    static async product(productId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.INVENTORY.ENDPOINTS.PRODUCTS + `/${productId}`, {
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

    static async createProduct(product) {
        const {name, description, type, purchasePrice, salePrice, stock} = product
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.INVENTORY.ENDPOINTS.PRODUCTS, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({
                name,
                description,
                type,
                purchasePrice,
                salePrice,
                stock
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

    static async editProduct(productId, product) {
        const {name, description, type, purchasePrice, salePrice, stock} = product
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.INVENTORY.ENDPOINTS.PRODUCTS + `/${productId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({
                name,
                description,
                type,
                purchasePrice,
                salePrice,
                stock
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


    static async deleteProduct(productId) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.INVENTORY.ENDPOINTS.PRODUCTS + `/${productId}`, {
            method: 'DELETE',
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

}

export default Inventory