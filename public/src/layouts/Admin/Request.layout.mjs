import Layout from '../layout/Layout.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import AccountLayout from '../Account.layout.mjs'
import Auth from '../../modules/Auth.module.mjs'
import Validator from '../../scripts/utils/validator.mjs'
import Table from '../components/Table.component.mjs'
import Bookings from '../../modules/Bookings.module.mjs'

class RequestLayout extends Layout {

    static name = 'Solicitudes'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-membershippayment')
        const bookings = await Bookings.bookings()
        content.innerHTML = `
        <h1 style="color:var(--tg-color-text-softer); letter-spacing: -1pt; padding: 20px;">Solicitudes</h1>
        <br>
        <div style="width: 100%; overflow: auto;">
            ${Table(bookings)}
        </div>
        `

        return content
    }

}

export default RequestLayout