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
            ${bookings.map(booking => {
                renderRequest(booking)
            }).join('')}
        </div>
        `

        return content
    }

}

export default RequestLayout

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
      
        const requestDate = new Date(date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      
        const createdDate = new Date(createdAt).toLocaleString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      
        return `
          <div class="tg-layout-request-admin">
            <div class="tg-layout-request-info">
              <p><strong>Usuario ID:</strong> ${userId}</p>
              <p><strong>Fecha:</strong> ${requestDate}</p>
              <p><strong>Hora:</strong> ${startTime} - ${endTime}</p>
              <p><strong>Razón:</strong> ${reason}</p>
              <p><strong>Estado:</strong> ${status}</p>
              <p><strong>Creado en:</strong> ${createdDate} por ${createdBy}</p>
              <p><strong>Actividad ID:</strong> ${activityId}</p>
            </div>
            <div class="tg-layout-request-actions">
              <button class="tg-btn-approve" onclick="handleApprove('${id}')">Aprobar</button>
              <button class="tg-btn-reject" onclick="handleReject('${id}')">Rechazar</button>
            </div>
          </div>
        `;      
}