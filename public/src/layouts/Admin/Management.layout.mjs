import Layout from '../layout/Layout.mjs'
import Auth from '../../modules/Auth.module.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import { timeFormatter, dateFormatter } from "../../scripts/utils/novato.mjs";
import GymHeader from '../components/injectables/GymHeader.injectable.mjs';

class ManagementLayout extends Layout {

    static name = 'Administración'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-management-content')
        content.innerHTML = `
        <div id="iGymHeader"></div>
        `

        const injectables = {
            'iGymHeader': GymHeader
        }
        for(const injectable in injectables) {
            $(injectable, content).replaceChildren(await injectables[injectable](user, this, gym))
        }
        
        return content
    }

}

export default ManagementLayout