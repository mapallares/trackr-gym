import Layout from '../layout/Layout.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import { timeFormatter, dateFormatter } from "../../scripts/utils/novato.mjs"
import Calendar from '../components/Calendar.component.mjs'
import { GymSelector } from '../components/contextables/GymSelector.modaler.contextable.mjs'

class DashboardLayout extends Layout {

    static name = 'Dashboard'

    static render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(this.getContent(user))
    }

    static getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-dashboard-content')
        content.innerHTML = `
        <div class="tg-layout-dashboard-banner">
            <div class="tg-layout-dashboard-banner-greetings">
                <h4 class="tg-layout-dashboard-banner-greetings-date">${dateFormatter(new Date())}<h4>
                <br>
                <h1 class="tg-layout-dashboard-banner-greetings-name">${timeFormatter()}, ${user.session.account.name}
                <br>
                <strong>¿Quieres entrenar hoy?</strong>
                </h1>
                <br><p>Aquí tienes un resumen de actividades</p>
            </div>

            <div class="tg-layout-dashboard-banner-gym">
                <div class="tg-layout-dashboard-banner-gym-card" id="gymSelectorBtn">
                ${localStorage.getItem('gymId') ? `<img src="https://firebasestorage.googleapis.com/v0/b/authentication-app-e625b.appspot.com/o/imagenes%2F${localStorage.getItem('gymId')}.jpg?alt=media">` : "<h2>Seleccione un Gimnasio</h2>"}
                </div>
            </div>
        </div>

        <div class="tg-layout-dashboard-feet">
            <div class="tg-layout-dashboard-feet-notifications">
                <img src="https://miro.medium.com/max/6009/1*SvtF4kmd8mKZdQ6hLLMh8w.jpeg" style="width: 98%; border-radius: 16px;">
            </div>
            <div class="tg-layout-dashboard-feet-schedule">
                ${Calendar()}
            </div>
        </div>
        `

        $('gymSelectorBtn', content).addEventListener('click', async () => {
            await GymSelector(user, this)
        })
        
        return content
    }

}

export default DashboardLayout