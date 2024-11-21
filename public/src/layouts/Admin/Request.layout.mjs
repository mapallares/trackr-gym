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
        content.classList.add('tg-layout-requests-content')
        const bookings = await Bookings.bookings()
        content.innerHTML = `
        <h1 style="color:var(--tg-color-text-softer); letter-spacing: -1pt; padding: 20px;">Solicitudes de Reserva (${bookings.length})</h1>
        <br>
        <div style="width: 100%; overflow: auto;">
            ${bookings.map(booking => {
              return renderRequest(booking)
            }).join('')}
        </div>
        `

        bookings.forEach(booking => {

          $(`aprove_${booking.id}`, content).whenClick(async () => {
              const approved = await Bookings.approve(booking.id, booking)
              if(approved) {
                  Notify.notice('La reserva fue aprovada')
                  super.render(user, this)
              }
              else {
                  Notify.notice('No se ha podido confirmar la reserva', 'warning')
              }
          })

          $(`unaprove_${booking.id}`, content).whenClick(async () => {
            const approved = await Bookings.cancel(booking.id, booking)
            if(approved) {
                Notify.notice('La reserva fue rechazada')
                super.render(user, this)
            }
            else {
                Notify.notice('No se ha podido rechazar la reserva', 'warning')
            }
          })
          
        })

        return content
    }

}

function renderRequest(booking) {
        const {
          id,
          userId,
          date,
          startTime,
          endTime,
          reason,
          status,
          createdAt,
          createdBy,
          activityId,
        } = booking;
      
        return `
          <div class="tg-layout-request-admin">
            <div class="tg-layout-request-info">
              <p><strong>Usuario ID:</strong> ${userId}</p>
              <p><strong>Fecha:</strong> ${new Date(date).toDateString()}</p>
              <p><strong>Hora:</strong> ${startTime} - ${endTime}</p>
              <p><strong>Razón:</strong> ${reason}</p>
              <p><strong>Estado:</strong> ${status}</p>
              <p><strong>Creado en:</strong> ${new Date(createdAt).toDateString()} por ${createdBy}</p>
              <p><strong>Actividad ID:</strong> ${activityId}</p>
            </div>
            <div class="tg-layout-request-actions">
              <tg-button variant="dimed" id="aprove_${id}"><span class="material-symbols-outlined">check</span> Aprobar</tg-button>
              <tg-button variant="dimed" id="unaprove_${id}" color="danger"><span class="material-symbols-outlined">close</span> Rechazar</tg-button>
            </div>
          </div>
        `     
}

export default RequestLayout
