import Layout from '../layout/Layout.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import AccountLayout from '../Account.layout.mjs'
import Auth from '../../modules/Auth.module.mjs'
import Validator from '../../scripts/utils/validator.mjs'
import Memberships from '../../modules/Memberships.module.mjs'
import { UDC, YYYYMMDD } from '../../scripts/utils/novato.mjs'

class MembershipPayment extends Layout {

    static name = 'Confirmar Membresía'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        const plan = await Memberships.plan(localStorage.getItem('planId'))
        content.classList.add('tg-layout-membershippayment-content')
        content.innerHTML = `
        <div class="tg-layout-membershippayment-form">
            <div class="tg-layout-membershippayment-progress">
                <div class="tg-layout-membershippayment-progress-bar" id="progressBar"></div>
            </div>
            <div class="tg-layout-membershippayment-plan">
            ${planCard(plan)}
            </div>
            <div class="tg-layout-membershippayment-forms" id="paymentFormContent">
                    <form class="tg-layout-form-form" id="paymentForm">
                        <center><h2>¿Cuánto tiempo quieres la membresía?</h2></center>
                        <br>
                        <div class="tg-layout-form-inputs">
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="paymentTime" name="time" min="1" max="31" type="number" required="required">
                                <label class="tg-layout-form-label" for="paymentTime">Digita los días</label>
                            </div>
                        </div>
                        <br>
                        <tg-button width="full" color="black" id="paymentFormBtn">Seguir</tg-button>
                    </form>     
            </div>
            <div class="tg-layout-membershippayment-forms-users" id="usersForm">

            </div>
        </div>
        `

        $('paymentFormBtn', content).whenClick(async () => {
            const time = parseInt($('paymentTime').value)
            const purchaseDate = new Date()
            const expirationDate = new Date(new Date(purchaseDate).setDate(purchaseDate.getDate() + time))
            const paymentDueDate = new Date(new Date(expirationDate).setDate(expirationDate.getDate() + time))
            const userId = user.session.userId
            const paymentId = userId
            const result = await Memberships.new(localStorage.getItem('planId'), { purchaseDate: YYYYMMDD(purchaseDate), expirationDate: YYYYMMDD(expirationDate), paymentDueDate: YYYYMMDD(paymentDueDate), userId, paymentId })
            if(result) {
                Notify.notice('La membresía se ha procesado correctamente')
                Notify.notice('Se ha pagado la membresía automáticamente', 'warning')
                $('progressBar', content).style.width = '100%'
                $('paymentFormContent', content).style.display = 'none'
                $('usersForm', content).innerHTML = `<p><strong>¡Membresías Activa!</strong> se vence dentro de ${time} días.</p>
                <p><strong>Expira el: </strong>${expirationDate.toLocaleDateString()}</p>
                <p><strong>Pague hasta: </strong>${paymentDueDate.toLocaleDateString()}</p>`

            }
        })

        return content
    }

}

export default MembershipPayment

function planCard(plan) {
    return `
    <div class="tg-layout-memberships-plan" data-id="${plan.id}">
        <span class="tg-layout-memberships-plan-icon material-symbols-outlined">kid_star</span>
        <div class="tg-layout-memberships-plan-name">
            <h4>${plan.name}</h4>
            <span>${plan.ability} Accesos</span>
        </div>
        <div class="tg-layout-memberships-plan-price">
            <h3>$${UDC(parseInt(plan.price))} COP</h3>
            <span>Sin renovación</span>
        </div>
        <div class="tg-layout-memberships-dividir"></div>
        <div class="tg-layout-memberships-benefits">
            ${plan.benefits.length > 0 ? plan.benefits.map(benefit => planBenefitItem(benefit)).join('') : '<div class="tg-layout-memberships-plans-empty">Plan sin beneficios</div>'}
        </div>
    </div>
    `
}

function planBenefitItem(benefit) {
    return `
    <div class="tg-layout-memberships-plan-benefit tg-layout-added-benefit tg-layout-memberships-plan-benefit-${benefit.isApplicable}" id="addedBenefit_${benefit.id}">
        <span class="material-symbols-outlined">${benefit.isApplicable ? 'check_circle' : 'cancel'}</span>
        <p>${benefit.name}</p>
    </div>
    `
}