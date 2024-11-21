import Layout from '../layout/Layout.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import Auth from '../../modules/Auth.module.mjs'
import Table from '../components/Table.component.mjs'

class UsersLayout extends Layout {

    static name = 'Usuarios'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-membershippayment')
        const users = await Auth.users()
        content.innerHTML = `
        <h1 style="color:var(--tg-color-text-softer); letter-spacing: -1pt; padding: 20px;">Usuarios</h1>
        <br>
        <div style="width: 100%; overflow: auto;">
            ${Table(users)}
        </div>
        `

        return content
    }

}

export default UsersLayout