import Layout from './layout/Layout.mjs'
import Notify from '../scripts/utils/notify.mjs'
import { $ } from '../scripts/utils/selectors.mjs'
import AccountLayout from './Account.layout.mjs'
import Auth from '../modules/Auth.module.mjs'
import Validator from '../scripts/utils/validator.mjs'

class ResetLayout extends Layout {

    static name = 'Cambiar Contraseña'

    static render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(this.getContent(user))
    }

    static getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-reset')
        content.innerHTML = `
        <div class="tg-layout-reset-form">
            <form class="tg-form" id="resetForm">

                <div class="tg-form-brand">
                    <img src="../src/assets/logos/ex_logo.svg" alt="">
                    <h2 class="tg-form-brand-name"><b>Trackr</b>Gym</h2>
                    <p class="tg-form-brand-info">Registre su nueva contraseña</p>
                </div>

                <div class="tg-form-group">
                    <div class="tg-form-input-container">
                        <span class="material-symbols-outlined">key</span>
                        <input class="tg-form-input" type="password" name="oldPassword" id="resetOldPassword" placeholder="Ingrese su contraseña actual" autocomplete="off" required>
                    </div>
                </div>

                <div class="tg-form-group">
                    <div class="tg-form-input-container">
                        <span class="material-symbols-outlined">password</span>
                        <input class="tg-form-input" type="password" name="newPassword" id="resetNewPassword" placeholder="Ingrese su nueva contraseña" autocomplete="off" required>
                    </div>
                </div>

                <div class="tg-form-group">
                    <div class="tg-form-input-container">
                        <span class="material-symbols-outlined">lock</span>
                        <input class="tg-form-input" type="password" name="repeatNewPassword" id="resetRepeatNewPassword" placeholder="Repita su nueva contraseña" autocomplete="off" required>
                    </div>
                </div>

                <br>

                <div class="tg-layout-reset-btns">
                    <tg-button width="full" type="submit" id="resetSubmit">
                        <b>Cambiar</b>
                    </tg-button>

                    <tg-button variant="dimed" color="danger" width="full" id="resetCancel">
                        <b>Cancelar</b>
                    </tg-button>
                </div>

            </form>
        </div>
        `

        const $resetForm = {
            element: $('resetForm', content),
            fields: {
                oldPassword: $('resetOldPassword', content),
                newPassword: $('resetNewPassword', content),
                repeatNewPassword: $('resetRepeatNewPassword', content)
            },
            submit: $('resetSubmit', content)
        }

        $resetForm.submit.whenClick(async() => {
            const data = Object.fromEntries(new FormData($resetForm.element))
            const { oldPassword, newPassword, repeatNewPassword } = data
    
            const isValid = Validator.valid($resetForm.fields.oldPassword, () => {
                Validator.required({ oldPassword })
            })
            && Validator.valid($resetForm.fields.newPassword, () => {
                Validator.required({ newPassword })
                if(newPassword === oldPassword) throw new Error('La nueva contraseña no debe ser igual a la anterior')
            })             
            && Validator.valid($resetForm.fields.repeatNewPassword, () => {
                Validator.required({ repeatNewPassword })
                if(newPassword != repeatNewPassword) throw new Error('Debe repetir la misma contraseña')
            })
    
            if(!isValid) return false

            const status = await Auth.reset({ oldPassword, newPassword })

            if(status) Notify.notice('Contraseña se ha cambiado correctamente') && super.render(user, AccountLayout)
            else Notify.notice('No se ha podido cambiar la contraseña', 'error') && super.render(user, AccountLayout)

        })
    
        for(const field in $resetForm.fields) {
            $resetForm.fields[field].addEventListener('keydown', (event) => {
                if(event.keyCode === 13) {
                    $resetForm.submit.click()
                }
            })
        }

        $('resetCancel', content).whenClick(async () => {
            await super.render(user, AccountLayout)
        })
        
        return content
    }

}

export default ResetLayout