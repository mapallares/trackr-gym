import * as auth from '../firebase/auth.controller.mjs'
import { emailUsername } from '../scripts/utils/novato.mjs'
import { API } from '../scripts/configs/api.config.mjs'
import Notify from '../scripts/utils/notify.mjs'

export class Auth {

    static async login(method, userCredential) {
        const methods = {
            "email": async () => await auth.signInWithEmail(userCredential.email, userCredential.password),
            "google": async () => await auth.signInGoogle()
        }

        if (methods[method]) {

            try {
                await fetch(API.AUTH.ENDPOINTS.LOGIN, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    body: JSON.stringify({
                        "username": emailUsername(userCredential.email),
                        "password": userCredential.password
                    })
                })
                    .then((response) => response.json())
                    .then((result) => localStorage.setItem('token', result.token || ""))
                    .catch((error) => console.error(error))
            } catch (error) {
                console.log(error)
                throw new Error("Microservicio de Auth no se encuentra disponible")
            }

            return await methods[method]()
        } else {
            throw new Error("Invalid login method")
        }
    }

    static async logout() {
        return auth.signOut()
    }

    static async register(email, password, displayName, photoURL) {
        await auth.signUpWithEmail(email, password)
        await auth.updateUserProfile({ "displayName": displayName, "photoURL": photoURL })
    }

    static async reset({ oldPassword, newPassword }) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.AUTH.ENDPOINTS.RESET, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({ oldPassword, newPassword })
        })
        const content = await response.json()
        if (response.ok) {
            return await auth.updateUserPassword(newPassword)
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async modify(data) {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.AUTH.ENDPOINTS.MODIFY, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            redirect: 'follow',
            body: JSON.stringify({ ...data })
        })
        const content = await response.json()
        console.log(content)
        if (response.ok) {
            return await auth.updateUserProfile({ displayName: data.name, email: data.email })
        }
        else {
            Notify.notice(content.message, 'error')
            return false
        }
    }

    static async session(callback) {
        auth.startSession(async (user) => {
            if (user) {
                try {
                    const token = localStorage.getItem('token') || ""
                    let session = null
                    await fetch(API.AUTH.ENDPOINTS.SESSION, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                    })
                        .then((response) => response.json())
                        .then((result) => session = result)
                        .catch((error) => console.error(error))
                    user.role = session.roles[0] || null
                    user.session = session
                } catch (error) {
                    this.logout()
                }
            }

            callback(user || null)
        })
    }

    static async users() {
        const token = localStorage.getItem('token') || ""
        const response = await fetch(API.AUTH.ENDPOINTS.USERS, {
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
}

export default Auth