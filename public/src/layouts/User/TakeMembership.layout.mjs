import Layout from '../layout/Layout.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import AccountLayout from '../Account.layout.mjs'
import Auth from '../../modules/Auth.module.mjs'
import Validator from '../../scripts/utils/validator.mjs'

class MembershipPayment extends Layout {

    static name = 'Confirmar Membresía'

    static render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(this.getContent(user))
    }

    static getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-membershippayment')
        content.innerHTML = `
        <div class="tg-layout-membershippayment-form">
            
        </div>
        `

        return content
    }

}

export default MembershipPayment