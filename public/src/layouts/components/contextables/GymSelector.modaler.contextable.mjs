import { $ } from "../../../scripts/utils/selectors.mjs"
import Layout from "../../layout/Layout.mjs"
import Memberships from "../../../modules/Memberships.module.mjs"

export async function GymSelector(user, layout) {
    const gyms = await Memberships.gyms()
    Layout.popup(`
        <div class="tg-layout-home-modal-gymselector" id="gymSelector">
            <h2>Seleccione el Gimnasio</h2>
            ${gyms.map(gym => gymItem(gym)).join('')}
        </div>
    `)
    $('gymSelector').addEventListener('click', () => {
        Layout.modal.classList.remove('active')
    })
    gyms.forEach(gym => {
        $(`[data-id="${gym.id}"]`).addEventListener('click', () => {
            localStorage.setItem('gymId', gym.id)
            Layout.render(user, layout)
        })
    })
}

function gymItem(gym) {
    return `
        <div class="tg-layout-home-modal-gym" data-id="${gym.id}">
            <h3>${gym.name}</h3>
            <span>${gym.type} | ${gym.nit}</span>
            <p><span class="material-symbols-outlined">location_on</span>${gym.adress}</p>
        </div>
    `
}

export default GymSelector