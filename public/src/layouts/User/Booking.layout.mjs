import Layout from '../layout/Layout.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import Memberships from '../../modules/Memberships.module.mjs'
import { dateFormatter } from '../../scripts/utils/novato.mjs'
import { GymSelector } from '../components/contextables/GymSelector.modaler.contextable.mjs'
import Bookings from '../../modules/Bookings.module.mjs'

class BookingLayout extends Layout {

    static name = 'Reservas'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-booking-content')
        const gym = await Memberships.gym(localStorage.getItem('gymId'))
        const bookings = await Bookings.bookings()
        content.innerHTML = `
        <header class="tg-layout-booking-header">
            <div class="tg-layout-booking-header-gymselector-btn" id="gymSelectorBtn">
                <img src="https://firebasestorage.googleapis.com/v0/b/authentication-app-e625b.appspot.com/o/imagenes%2F${gym.id}.jpg?alt=media">
            </div>
            <div class="tg-layout-booking-header-gym">
                <h2>${gym.name}</h2>
            </div>
            <div class="tg-layout-booking-header-date">
                <strong>${dateFormatter(new Date())}</strong>
            </div>
        </header>
        <div class="tg-layout-booking-btn">
            <tg-button radius="full" id="bookingBtn"><span class="material-symbols-outlined">add</span> Reservar</tg-button>
        </div>
        <div class="tg-layout-booking-bookings">
            ${bookingsCalendar(bookings)}        
        </div>
        `

        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        bookings.forEach(booking => {
            const date = new Date(booking.date)
            if(date.getFullYear() == currentYear && date.getMonth() == currentMonth) {
                $(`bookings_${date.getUTCDate()}`, content).innerHTML += `
                ${scheduleEvent(booking)}
                `
            }
        })

        $('bookingBtn', content).whenClick(() => {
            super.popup(`
                <div class="tg-layout-booking-modal">
                    <form class="tg-layout-form-form" id="bookingForm">
                        <h2>Solicitud de Reserva</h2>
                        <br>
                        <div class="tg-layout-form-inputs">
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="bookingDate" name="date" type="date" autoComplete="off" required="required">
                                <label class="tg-layout-form-label" htmlFor="bookingDate">Fecha de reserva</label>
                            </div>
                            <div class="tg-layout-form-input-group-double">
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="bookingStartTime" name="startTime" type="time" required="required">
                                    <label class="tg-layout-form-label" htmlFor="bookingStartTime">Desde</label>
                                </div>
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="bookingEndTime" name="endTime" type="time" required="required">
                                    <label class="tg-layout-form-label" htmlFor="bookingEndTime">Hasta</label>
                                </div>
                            </div>
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="bookingReason" name="reason" type="text" required="required">
                                <label class="tg-layout-form-label" htmlFor="bookingReason">Motivo</label>
                            </div>
                        </div>
                        <br>
                        <tg-button width="full" color="black" id="bookingFormBtn">Reservar</tg-button>
                    </form>     
                </div>
                `)
                
                $('bookingFormBtn').whenClick( async () => {
                    const data = Object.fromEntries(new FormData($('bookingForm')))
                    const branchId = localStorage.getItem('branchId')
                    const userId = user.session.userId
                    const activityId = localStorage.getItem('activityId')
                    const result = await Bookings.createBooking(activityId, {...data, branchId, userId })
                    if(result) Notify.notice("Reserva realizada con éxito")
                    super.modal.classList.remove('active')
                    super.render(user, this)
                })
        })

        $('gymSelectorBtn', content).addEventListener('click', async () => {
            await GymSelector(user, this)
        })

        return content
    }

}

function bookingsCalendar(bookings) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const bookingDates = new Set(bookings.map(booking => new Date(booking.date)));

    const daysInMonth = [];
    let dayOfWeek = firstDay.getDay();

    for (let i = 0; i < dayOfWeek; i++) {
        daysInMonth.push(`<td></td>`);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const currentDate = new Date(currentYear, currentMonth, day);
        const dateStr = currentDate.toISOString().split("T")[0];
        const isToday = currentDate.toDateString() === today.toDateString();
        const hasEvent = bookingDates.has(dateStr);

        const cellClasses = [];
        if (isToday) cellClasses.push("tg-layout-booking-calendar-today");
        if (hasEvent) cellClasses.push("tg-layout-booking-calendar-booking");

        daysInMonth.push(`
            <td class="tg-layout-booking-calendar-day ${cellClasses.join(' ')}">
                <span class="tg-layout-booking-calendar-day-number">${day}</span>
                <div class="tg-layout-booking-calendar-bookings" id="bookings_${day}">
                </div>
                ${hasEvent ? '<span class="tg-layout-booking-calendar-booking-indicator"></span>' : ""}
            </td>
        `);

        if ((dayOfWeek + 1) % 7 === 0) {
            daysInMonth.push("</tr><tr>");
        }

        dayOfWeek = (dayOfWeek + 1) % 7;
    }

    if (dayOfWeek !== 0) {
        for (let i = dayOfWeek; i < 7; i++) {
            daysInMonth.push(`<td></td>`);
        }
    }

    return `
        <div class="tg-layout-booking-calendar-content">
            <strong class="tg-layout-booking-calendar-month">${monthNames[currentMonth]} ${currentYear}</strong>
            <table class="tg-layout-booking-calendar">
                <thead>
                    <tr>${dayNames.map(day => `<th>${day}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    <tr>${daysInMonth.join('')}</tr>
                </tbody>
            </table>
        </div>
    `;
}


function scheduleEvent(event) {
    const { date, startTime, endTime, reason, isApproved, isCancelled } = event;
  
    const status = isCancelled
      ? "Cancelado"
      : isApproved
      ? "Aprobado"
      : "Pendiente";
  
    const statusClass = isCancelled
      ? "cancelled"
      : isApproved
      ? "approved"
      : "pending";
  
    const eventDate = new Date(date).toUTCString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    return `
      <div class="tg-layout-schedule-event ${statusClass}">
        <div class="tg-layout-schedule-date">${eventDate}</div>
        <div class="tg-layout-schedule-time">${startTime} - ${endTime}</div>
        <div class="tg-layout-schedule-reason">${reason}</div>
        <div class="tg-layout-schedule-status">${status}</div>
      </div>
    `;
  }

export default BookingLayout