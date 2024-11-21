import { $ } from "../../../scripts/utils/selectors.mjs"
import Layout from "../../layout/Layout.mjs"
import { CountdownTime } from "../../../scripts/utils/novato.mjs"
import BranchLayout from "../../User/Branch.layout.mjs"
import { GymSelector } from "../contextables/GymSelector.modaler.contextable.mjs"

export async function GymHeader (user, layout, gym) {
    const injectable = document.createElement('div')
    injectable.innerHTML = `
    <div class="tg-layout-search-header">
        <div class="tg-layout-search-header-gym">
            <div class="tg-layout-search-header-gym-logo" id="gymSelectorBtn">
                <img src="https://firebasestorage.googleapis.com/v0/b/authentication-app-e625b.appspot.com/o/imagenes%2F${gym.id}.jpg?alt=media">
            </div>
            <div class="tg-layout-search-header-gym-details">
                <p class="tg-layout-search-header-gym-details-nit">${gym.nit}</p>
                <strong class="tg-layout-search-header-gym-details-foundedin">Creado hace ${CountdownTime(new Date(gym.foundedIn).getTime())}</strong>
                <div class="tg-layount-search-header-gym-details-icons">
                    <p class="tg-layout-search-header-gym-details-adress"><span class="material-symbols-outlined">location_on</span>${gym.adress}</p>
                    <p class="tg-layout-search-header-gym-details-email"><span class="material-symbols-outlined">email</span>${gym.email}</p>
                    <p class="tg-layout-search-header-gym-details-phone"><span class="material-symbols-outlined">phone</span>${gym.phone}</p>
                    <p class="tg-layout-search-header-gym-details-phone"><span class="material-symbols-outlined">public</span><a href="/?gym=${gym.id}">https://trackrgym.web.app/</a></p>
                </div>
            </div>
            <div class="tg-layout-search-header-gym-networks">
                ${gym.networks.length > 0 ? gym.networks.map(network => networkIcon(network)).join('') : '<div class="tg-layout-search-header-gym-networks-empty">Sin redes sociales</div>'}
            </div>
        </div>

        <div class="tg-layout-search-header-branches">
            ${gym.branches.length > 0 ? '<h3>Sucursales</h3>' + gym.branches.map((branch, index) => branchCard(branch, index)).join('') : '<div class="tg-layout-search-header-branches-empty">Sin sucursales registradas</div>'}
        </div>
    </div>
    `
    gym.branches.forEach(branch => {
        $(`branchBtn_${branch.id}`, injectable).whenClick(() => {
            localStorage.setItem('branchId', branch.id)
            Layout.render(user, BranchLayout, layout)
        })
    })

    $('gymSelectorBtn', injectable).addEventListener('click', async () => {
        GymSelector(user, layout)
    })

    return injectable
}

export default GymHeader

function branchCard(branch, index) {
    return `
    <div class="tg-layout-search-header-branch">
        <div class="tg-layout-search-header-branch-info">
            <div class="tg-layout-search-header-branch-info-index">#${index + 1}</div>
            <div class="tg-layout-search-header-branch-info">
                <h4>${branch.name}</h4>
            </div>
            <tg-button size="xs" id="branchBtn_${branch.id}">Consultar</tg-button>
        </div>
        <div class="tg-layout-search-header-branch-location">
            <span class="material-symbols-outlined">location_on</span>
            <p>${branch.location}</p>
        </div>
    </div>
    `
}

function networkIcon(network) {
    return `
    <a class="tg-layout-search-header-gym-network" href="${network.link}"><i class="fa-brands fa-${network.name.toLowerCase()}"></i></a>
    `
}