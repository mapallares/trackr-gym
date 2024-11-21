import Layout from '../layout/Layout.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import { timeFormatter, dateFormatter } from "../../scripts/utils/novato.mjs"
import Calendar from '../components/Calendar.component.mjs'
import { GymSelector } from '../components/contextables/GymSelector.modaler.contextable.mjs'

class HomeLayout extends Layout {

    static name = 'Inicio'

    static render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(this.getContent(user))
    }

    static getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-home-content')
        content.innerHTML = `
        <div class="tg-layout-home-banner">
            <div class="tg-layout-home-banner-greetings">
                <h4 class="tg-layout-home-banner-greetings-date">${dateFormatter(new Date())}<h4>
                <br>
                <h1 class="tg-layout-home-banner-greetings-name">${timeFormatter()}, ${user.session.account.name}
                <br>
                <strong>¿Quieres entrenar hoy?</strong>
                </h1>
                <div class="tg-layout-home-banner-lastbooking">
                    <span class="material-symbols-outlined">event_available</span>
                    <p>Tu próxima visita está reservada <b>hoy de 8:00 a.m. a 9:30 a.m.</b></p>
                </div>
            </div>

            <div class="tg-layout-home-banner-gym">
                <div class="tg-layout-home-banner-gym-card" id="gymSelectorBtn">
                ${localStorage.getItem('gymId') ? `<img src="https://firebasestorage.googleapis.com/v0/b/authentication-app-e625b.appspot.com/o/imagenes%2F${localStorage.getItem('gymId')}.jpg?alt=media">` : "<h2>Seleccione un Gimnasio</h2>"}
                </div>
            </div>
        </div>

        <div class="tg-layout-home-feet">
            <div class="tg-layout-home-feet-notifications">
                <h2>Notificaciones</h2>
                <br>
                <img style="width: 100%; max-width: 300px; border-radius: 12px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1OS8QxXpuV1SJyv8Z_KMSOHcoseCL2RbX1Q&s">
                <p>Sin notificaciones</p>
            </div>
            <div class="tg-layout-home-feet-schedule">
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

export default HomeLayout