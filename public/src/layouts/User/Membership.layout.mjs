import Layout from '../layout/Layout.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import Memberships from '../../modules/Memberships.module.mjs'
import { UDC } from '../../scripts/utils/novato.mjs'
import MembershipPayment from './TakeMembership.layout.mjs'
import { GymSelector } from '../components/contextables/GymSelector.modaler.contextable.mjs'

class MembershipLayout extends Layout {

    static name = 'Membresía'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-membership-content')

        if(!localStorage.getItem('gymId')) {
            await GymSelector(user, this)
            return ''
        }

        const gym = await Memberships.gym(localStorage.getItem('gymId'))
        const plans = await Memberships.plans(localStorage.getItem('gymId'))
        const memberships = await Memberships.memberships(user.session.userId)
        content.innerHTML = `
        <header class="tg-layout-membership-header">
            <div class="tg-layout-membership-header-gymselector-btn" id="gymSelectorBtn">
                <img src="https://firebasestorage.googleapis.com/v0/b/authentication-app-e625b.appspot.com/o/imagenes%2F${gym.id}.jpg?alt=media">
            </div>
            <h3>${memberships.length === 0 ? 'Sin membresía activa' : 'Membresía Activa'}</h3>
        </header>
        <div class="tg-layout-membership-banner">
            <h4>${gym.name}<h4>
            <h1>Membresías</h1>
            <p>Seleccione el plan de membresía que mejor se ajuste a tus necesidades, puedes cancelar en cualquier momento</p>
            <div class="tg-layout-membership-filters">
                <div class="tg-layout-membership-filter tg-layout-membership-filter-active">Pasadías</div>
                <div class="tg-layout-membership-filter">Semanales</div>
                <div class="tg-layout-membership-filter">Mensuales</div>
            </div>
        </div>
        <div class="tg-layout-membership-plans-content">
            <div class="tg-layout-membership-plans">
            ${plans.length > 0 ? plans.map(plan => planCard(plan)).join('') : '<div class="tg-layout-membership-plans-empty">No hay planes disponibles</div>'}
            </div>
        </div>
        `

        plans.forEach(plan => {
            $(`[data-id="${plan.id}"]`, content).addEventListener('dblclick', () => {
                super.popup(planModal(plan))
            })
            $(`paymentBtn_${plan.id}`, content).whenClick(() => {
                localStorage.setItem('planId', plan.id)
                super.render(user, MembershipPayment, this)
            })
        })

        $('gymSelectorBtn', content).addEventListener('click', async () => {
            await GymSelector(user, this)
        })
        
        return content
    }

}

export default MembershipLayout

function planCard(plan) {
    return `
    <div class="tg-layout-membership-plan" data-id="${plan.id}">
        <span class="tg-layout-membership-plan-icon material-symbols-outlined">kid_star</span>
        <div class="tg-layout-membership-plan-name">
            <h4>${plan.name}</h4>
            <span>${plan.ability} Accesos</span>
        </div>
        <div class="tg-layout-membership-plan-price">
            <h3>$${UDC(parseInt(plan.price))} COP</h3>
            <span>Sin renovación</span>
        </div>
        <br>
        <tg-button size="s" width="full" id="paymentBtn_${plan.id}">Pagar Membresía</tg-button>
        <div class="tg-layout-membership-dividir"></div>
        <div class="tg-layout-membership-benefits">
            ${plan.benefits.length > 0 ? plan.benefits.map(benefit => planBenefitItem(benefit)).join('') : '<div class="tg-layout-membership-benefits-empty">Plan sin beneficios</div>'}
        </div>
    </div>
    `
}

function planBenefitItem(benefit) {
    return `
    <div class="tg-layout-membership-plan-benefit tg-layout-membership-plan-benefit-${benefit.isApplicable}">
        <span class="material-symbols-outlined">${benefit.isApplicable ? 'check_circle' : 'cancel'}</span>
        <p>${benefit.name}</p>
    </div>
    `
}

function planModal(plan) {
    return `
    <div class="tg-layout-membership-plan-modal">
    <div class="tg-layout-membership-plan" data-id="${plan.id}">
        <span class="tg-layout-membership-plan-icon material-symbols-outlined">kid_star</span>
        <div class="tg-layout-membership-plan-name">
            <h4>${plan.name}</h4>
            <span>${plan.ability} Accesos</span>
        </div>
        <div class="tg-layout-membership-plan-price">
            <h3>$${UDC(parseInt(plan.price))} COP</h3>
            <span>Sin renovación</span>
        </div>
        <br>
        <div class="tg-layout-membership-dividir"></div>
        <div class="tg-layout-membership-benefits">
            ${plan.benefits.map(benefit => planBenefitItem(benefit)).join('')}
        </div>
    </div>
    </div>
    `
}