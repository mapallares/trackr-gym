import Layout from './layout/Layout.mjs'
import Auth from '../modules/Auth.module.mjs'
import Validator from '../scripts/utils/validator.mjs'
import Notify from '../scripts/utils/notify.mjs'
import { $, $$ } from '../scripts/utils/selectors.mjs'
import ResetLayout from './Reset.layout.mjs'

class AccountLayout extends Layout {

    static name = 'Cuenta'

    static render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(this.getContent(user))
    }

    static getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-account-content')
        content.innerHTML = `
        <div class="tg-layout-account-container">

            <header class="tg-layout-account-header">
                <div class="tg-layout-account-header-user">
                    <div class="tg-layout-account-header-user-avatar">
                        <img src="${user.photoURL}">
                    </div>
                    <div class="tg-layout-account-header-user-info">
                        <strong>ID #${user.session.userId.substring(0, 7)}</strong>
                        <h2>${user.session.account.name}</h2>
                        <p>${{Admin: 'Administrador', User: 'Cliente'}[user.role] || "Sin rol"}</p>
                        <span>Activa</span>
                    </div>
                </div>

                <div class="tg-layout-account-header-qr">
                    <img src="src/assets/images/tg-qr.png">
                    <tg-button variant="plain" color="black" size="xs" radius="full" id="qrBtn">Ver QR</tg-button>
                </div>
            </header>

            <section class="tg-layout-account-data">
                <div class="tg-layout-account-data-flex">
                
                    <div class="tg-layout-account-data-form">
                        <form class="tg-form" id="accountForm"> 
                            <div class="tg-form-group">
                                <div class="tg-form-input-container">
                                    <span class="material-symbols-outlined">person</span>
                                    <input class="tg-form-input" type="text" name="name" id="registerName" placeholder="Nombre" autocomplete="off" value="${user.session.account.name}" required>
                                </div>
                            </div>

                            <div class="tg-form-group-double">
                                <div class="tg-form-group">
                                    <div class="tg-form-input-container">
                                        <span class="material-symbols-outlined">sort_by_alpha</span>
                                        <input class="tg-form-input" type="text" name="username" id="registerUsername" placeholder="Username" autocomplete="off" value="${user.session.account.username}" required>
                                    </div>
                                </div>
                                <div class="tg-form-group">
                                    <div class="tg-form-input-container">
                                        <span class="material-symbols-outlined">tag</span>
                                        <input class="tg-form-input" type="text" name="phone" id="registerPhone" placeholder="Teléfono" autocomplete="off" value="${user.session.account.phone}" required>
                                    </div>
                                </div>
                            </div>

                            <div class="tg-form-group">
                                <div class="tg-form-input-container">
                                    <span class="material-symbols-outlined">mail</span>
                                    <input class="tg-form-input" type="mail" name="email" id="registerMail" placeholder="Correo" autocomplete="off" value="${user.session.account.email}" required>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="tg-layout-account-data-settings">
                        <tg-button size="s" width="full" color="warning" id="disabledAccountBtn"><span class="material-symbols-outlined">visibility_off</span>Desactivar Cuenta</tg-button>
                        <tg-button size="s" width="full" color="danger" id="deletedAccountBtn"><span class="material-symbols-outlined">delete</span>Eliminar Cuenta</tg-button>
                    </div>
                </div>

                <div class="tg-layout-account-data-actions">
                    <tg-button size="s" id="modifyBtn"><span class="material-symbols-outlined">edit</span>Modificar Datos</tg-button>
                    <tg-button variant="dimed" size="s" color="warning" id="accountBtn"><span class="material-symbols-outlined">password</span>Cambiar Contraseña</tg-button>
                </div>
            </section>
        </div>
        `

        $('qrBtn', content).whenClick(() => {
            super.popup(modalUserQR(user))
        })

        let disabled = false
        $('disabledAccountBtn', content).whenClick(() => {
            super.process(() => {
                document.body.style.filter = disabled ? "" : "grayscale(1)"
                disabled = !disabled
                $$('tg-button', $('navItems')).forEach(tgb => tgb.setAttribute('disabled', 'true'))
            })
        })

        $('deletedAccountBtn', content).whenClick(() => {
            super.popup('')
        })

        $('modifyBtn', content).whenClick(async () => {
            const $accountForm = {
                element: $('accountForm', content),
                fields: {
                    name: $('accountName', content),
                    username: $('accountUsername', content),
                    phone: $('accountPhone', content),
                    email: $('accountEmail', content)
                },
                submit: $('accountSubmit', content)
            }

            const data = Object.fromEntries(new FormData($accountForm.element))
            const { name, username, phone, email } = data
    
            const isValid = 
            Validator.valid($accountForm.fields.name, () => {
                Validator.required({ name })
                Validator.length({ name }, 2, 500)
            })
            && Validator.valid($accountForm.fields.username, () => {
                Validator.required({ username })
                Validator.length({ username }, 2, 100)
            })
            && Validator.valid($accountForm.fields.phone, () => {
                Validator.required({ phone })
                Validator.length({ phone }, 2, 100)
            })
            && Validator.valid($accountForm.fields.email, () => {
                Validator.required({ email })
                Validator.email({ email })
            })
            
            if(!isValid) return false
            
            const status = await Auth.modify(data)

            if(status) {
                await Auth.session(session => {
                    Notify.notice('Se han modificado correctamente los datos') 
                    $('userSessionName').innerText = session.session.account.name || "Sin nombre"
                    $('userSessionRole').innerText = {Admin: 'Administrador', User: 'Cliente'}[session.role] || "Sin rol"
                    $('userSessionPhoto').innerHTML = session.photoURL != null ? `<img src="${session.photoURL}">` : ''
                    super.render(session, this)
                })
            }
            else {
                Notify.notice('No se ha podido modificado los datos', 'error') 
                super.render(user, this) 
            }
        })

        $('accountBtn', content).whenClick(() => {
            super.render(user, ResetLayout, this)
        })

        return content
    }

}

function modalUserQR(user) {
    return `
    <div class="tg-layout-account-modal-content">
        <img src="src/assets/images/tg-qr.png">
        <h1>${user.session.name}</h1>
        <span>${{Admin: 'Administrador', User: 'Cliente'}[user.role] || "Sin rol"}</span>
        <p><b>ID</b> #${user.session.userId.substring(0, 7)}</p>
    </div>
    `
}

export default AccountLayout