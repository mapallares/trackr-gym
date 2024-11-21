import Layout from '../layout/Layout.mjs'
import Auth from '../../modules/Auth.module.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import { timeFormatter, dateFormatter } from "../../scripts/utils/novato.mjs";

class CatalogLayout extends Layout {

    static name = 'Catálgo'

    static render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(this.getContent(user))
    }

    static getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-catalog-content')
        content.innerHTML = `
        <img style="width: 100%; max-width: 300px;" src="https://cdn2.iconfinder.com/data/icons/development-36/200/team-coding-2--team-coding-PROGRAMMING-SOFTWARE-WEB-DEVELOPMENT-DEVELOPERS-APP-PC-MAC-WORK-HTML-512.png">
        <h1>Módulo en construcción</h1>
        `
        
        return content
    }

}

export default CatalogLayout