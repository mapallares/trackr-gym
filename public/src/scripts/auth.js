import { PATH } from './configs/path.config.mjs'
import { $, $$ } from './utils/selectors.mjs'
import routes from './utils/routes.mjs'
import { Auth } from '../modules/Auth.module.mjs'
import { Notify } from './utils/notify.mjs'
import { Validator } from './utils/validator.mjs'

document.addEventListener('DOMContentLoaded', () => {
    Auth.session((user) => {
        if (user) {
            routes.set(PATH.APP)
        }
        else {
            startLogin()
            startRegister()
            $('#loader').load(false)
            $$('.toggle-form').forEach(toggle => toggle.addEventListener('click', () => {
                $('tg-main-card').classList.toggle('tg-main-card-fliped')
            }))
        }
    })
})

const $form = {
    login: {
        element: $('loginForm'),
        fields: {
            email: $('loginEmail'),
            password: $('loginPassword'),
        },
        submit: $('loginSubmit'),
        providers: {
            google: $('loginGoogle'),
            microsoft: $('loginMicrosoft')
        }
    },
    register: {
        element: $('registerForm'),
        fields: {
            name: $('registerName'),
            username: $('registerUsername'),
            phone: $('registerPhone'),
            email: $('registerEmail'),
            password: $('registerPassword'),
        },
        submit: $('registerSubmit')
    }
}

const startLogin = () => {

    $form.login.providers.google.whenClick(async() => {
        try {
            await Auth.login('google')
        } catch (error) {
            Notify.notice(error, 'error')
        }
    })

    $form.login.providers.microsoft.whenClick(async() => {
        Notify.notice('Microsoft Provider no está disponible por el momento, pruebe con otro método de autenticación', 'warning')
        $form.login.providers.microsoft.setAttribute('disabled', true)
    })

    $form.login.submit.whenClick(async() => {
        const data = Object.fromEntries(new FormData($form.login.element))
        const { email, password } = data

        const isValid = Validator.valid($form.login.fields.email, () => {
            Validator.required({ email })
            Validator.email({ email })
        }) 
        && Validator.valid($form.login.fields.password, () => {
            Validator.required({ password })
        })

        if(!isValid) return false

        if(!data.email?.includes("@")) {
            data.email = data.email + "@gym.com"
        }

        const authResponse = await Auth.login('email', {
            email: data.email, 
            password: data.password
        })

        if (authResponse.includes('wrong-password')) {
            Notify.notice('Contraseña incorrecta', 'error')
            $form.login.fields.password.focus()
        }
        else if(authResponse.includes('user-not-found')) {
            Notify.notice('Las credenciales proporcionadas no corresponden a un usuario registrado en el sistema', 'warning')
            $form.login.fields.email.value = ""
            $form.login.fields.password.value = ""
            $form.login.fields.email.focus()
        }
        else {
            Notify.notice(authResponse, 'error')
            $form.login.fields.email.value = ""
            $form.login.fields.password.value = ""
            $form.login.fields.email.focus()
        }
    })

    for(const field in $form.login.fields) {
        $form.login.fields[field].addEventListener('keydown', (event) => {
            if(event.keyCode === 13) {
                $form.login.submit.click()
            }
        })
    }

}

const startRegister = () => {
    $form.register.submit.whenClick(async() => {
        const data = Object.fromEntries(new FormData($form.register.element))
        const { name, username, phone, email, password } = data

        const isValid = 
        Validator.valid($form.register.fields.name, () => {
            Validator.required({ name })
            Validator.length({ name }, 2, 500)
        })
        && Validator.valid($form.register.fields.username, () => {
            Validator.required({ username })
            Validator.length({ username }, 2, 100)
        })
        && Validator.valid($form.register.fields.phone, () => {
            Validator.required({ phone })
            Validator.length({ phone }, 2, 100)
        })
        && Validator.valid($form.register.fields.email, () => {
            Validator.required({ email })
            Validator.email({ email })
        }) 
        && Validator.valid($form.register.fields.password, () => {
            Validator.required({ password })
        })
    
        if(!isValid) return false

        await Auth.register(data)
    })

    for(const field in $form.register.fields) {
        $form.register.fields[field].addEventListener('keydown', (event) => {
            if(event.keyCode === 13) {
                $form.register.submit.click()
            }
        })
    }

}