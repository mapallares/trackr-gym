import Layout from '../layout/Layout.mjs'
import Memberships from '../../modules/Memberships.module.mjs'

class BranchLayout extends Layout {

    static name = 'Detalles de Sucursal'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        const branch = await Memberships.branch(localStorage.getItem('branchId'))
        content.classList.add('tg-layout-branch')
        content.innerHTML = `
        ${branchView(branch)}
        `

        return content
    }

}

function  branchView(branch) {
    const { id, name, description, location, status, isActive, schedules, plans } = branch;

    const container = document.createElement('div');
    container.className = 'gym-branch';

    container.innerHTML = `
        <h1 class="branch-title"><span class="material-symbols-outlined">flag</span> ${name}</h1>
        <p class="branch-description">${description}</p>
        <ul class="branch-info">
            <li><strong><span class="material-symbols-outlined">notes</span>ID:</strong><p>${id}</p></li>
            <li><strong><span class="material-symbols-outlined">location_on</span>Ubicación:</strong><p>${location}</p></li>
            <li><strong><span class="material-symbols-outlined">radio_button_unchecked</span>Estado:</strong><p>${status}</p></li>
            <li><strong><span class="material-symbols-outlined">toggle_on</span>Activo:</strong><p>${isActive ? 'Sí' : 'No'}</p></li>
        </ul>
        <h2>Horarios</h2>
        ${
            schedules && schedules.length > 0
                ? `<ul class="schedules">
                    ${schedules.map(schedule => `
                        <li class="schedule-item">
                            <span class="material-symbols-outlined">schedule</span>
                            <strong>${schedule.day}:</strong>
                            ${schedule.startTime} - ${schedule.endTime} (${schedule.type})
                            <p><strong>Recurrente:</strong> ${schedule.isRecurrent ? 'Sí' : 'No'}</p>
                            <p><strong>Aplica en días festivos:</strong> ${schedule.isAppliesOnHolidays ? 'Sí' : 'No'}</p>
                        </li>
                    `).join('')}
                </ul>`
                : '<p style="padding: 10px 0 20px 0;">No hay horarios registrados.</p>'
        }
        <h2>Planes</h2>
        <p style="padding: 10px 0 0 0;">${plans ? plans : 'No hay planes registrados.'}</p>
    `;

    return container.outerHTML;
}

export default BranchLayout