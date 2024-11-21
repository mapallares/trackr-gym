import Layout from '../layout/Layout.mjs'
import { $, $$ } from '../../scripts/utils/selectors.mjs'
import Memberships from '../../modules/Memberships.module.mjs'
import Validator from '../../scripts/utils/validator.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { UDC } from '../../scripts/utils/novato.mjs'
import MembershipsLayout from './Memberships.layout.mjs'

class PlanLayout extends Layout {

    static name = 'Plan Editor'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-plan-content')
        let plan = await Memberships.plan(localStorage.getItem('planId'))
        const benefits = await Memberships.benefits(localStorage.getItem('gymId'))
        content.innerHTML = `
                <div class="tg-layout-plan-form">
                    <form class="tg-layout-form-form" id="planForm">
                        <div class="tg-layout-form-inputs">
                            <div class="tg-layout-form-input-group-double">
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planName" name="name" type="text" autoComplete="off" required="required" value="${plan.name}">
                                    <label class="tg-layout-form-label" htmlFor="planName">Nombre</label>
                                </div>
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planType" name="type" type="text" required="required" value="${plan.type}">
                                    <label class="tg-layout-form-label" htmlFor="planType">Tipo</label>
                                </div>
                            </div>
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="planDescription" name="description" type="text" required="required" value="${plan.description}">
                                <label class="tg-layout-form-label" htmlFor="planDescription">Description</label>
                            </div>
                            <div class="tg-layout-form-input-group-double">
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planPrice" name="price" type="number" autoComplete="off" required="required" value="${plan.price}">
                                    <label class="tg-layout-form-label" htmlFor="planPrice">Precio</label>
                                </div>
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planAbility" name="ability" type="number" required="required" value="${plan.ability}">
                                    <label class="tg-layout-form-label" htmlFor="planAbility">Capacidad</label>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="tg-layout-form-btn-colum-group">
                            <tg-button width="full" color="black" id="planFormBtn">Editar</tg-button>
                            <tg-button width="full" variant="dimed" color="danger" id="planDeleteBtn">Eliminar</tg-button>
                        </div>
                    </form>  
                    </div>
                <div class="tg-layout-plan-card">
                    <div class="tg-layout-plan-card-body">
                    <div id="plan">
                    ${planCard(plan)}
                    </div>
                    <tg-button size="s" id="benefitsBtn"><span class="material-symbols-outlined">add</span> Asignar beneficio</tg-button>
                    
                    <div class="tg-layout-plan-benefits-selector" id="benefits"></div>
                    </div>
                </div>
            </div>
        `

        const renderPlan = async () => {
            plan = await Memberships.plan(localStorage.getItem('planId'))
            $('plan').innerHTML = planCard(plan)
            plan.benefits.forEach(benefit => {
                $(`addedBenefit_${benefit.id}`).addEventListener('click', async () => {
                    const result = await Memberships.revokeBenefit(localStorage.getItem('planId'), benefit.id)
                    if(result) {
                        await renderPlan()
                        Notify.notice(result.message)
                    }  
                })
            })
        }

        plan.benefits.forEach(benefit => {
            $(`addedBenefit_${benefit.id}`, content).addEventListener('click', async () => {
                const result = await Memberships.revokeBenefit(localStorage.getItem('planId'), benefit.id)
                if(result) {
                    await renderPlan()
                    Notify.notice(result.message)
                }  
            })
        })

        $('benefitsBtn', content).whenClick(async () => {
            $('benefits').classList.add('tg-layout-plan-benefits-selector-active')
            $('benefits', content).innerHTML = + benefits.length > 0 ?  '<h3>Asignación de beneficios</h3>' + benefits.map(benefit => `
                <div class="tg-layout-plan-benefits-selector-item" id="benefit_${benefit.id}">
                <div class="tg-layout-plan-benefits-selector-item-name">${benefit.name}</div>
                <div class="tg-layout-plan-benefits-selector-item-actions">
                    <tg-button size="s" variant="dimed" color="success" icon="true" id="isApplicable_${benefit.id}"><span class="material-symbols-outlined">arrow_upward</span></tg-button>
                    <tg-button size="s" variant="dimed" color="danger" icon="true" id="isNotApplicable_${benefit.id}"><span class="material-symbols-outlined">arrow_downward</span></tg-button>
                </div>
                </div>
                `).join('') : '<p>Sin beneficios creados</p>'
            benefits.forEach(async benefit => {
                $(`isApplicable_${benefit.id}`, content).whenClick(async () => {
                    const result = await Memberships.assignBenefit(localStorage.getItem('planId'), benefit.id, true)
                    if(result) {
                        await renderPlan()
                        Notify.notice(result.message)
                    }
                    $('benefits').classList.remove('tg-layout-plan-benefits-selector-active')
                })
                $(`isNotApplicable_${benefit.id}`, content).whenClick(async () => {
                    const result = await Memberships.assignBenefit(localStorage.getItem('planId'), benefit.id, false)
                    if(result) {
                        await renderPlan()
                        Notify.notice(result.message)
                    }
                    $('benefits').classList.remove('tg-layout-plan-benefits-selector-active')
                })
            })
        })

        $('planDeleteBtn', content).whenClick(async () => {
            const deleted = await Memberships.deletePlan(localStorage.getItem('planId'))

            if(deleted) {
                Notify.notice('Plan eliminado con éxito')
                super.render(user, MembershipsLayout)
            }
            else {
                Notify.notice('No se ha podido eliminar el plan', 'warning')
            }
        })

        $('planFormBtn', content).whenClick(async () => {
            const data = Object.fromEntries(new FormData($('planForm', content)))
            const { name, type, description, price, ability } = data
    
            const isValid = 
            Validator.valid($('planName', content), () => {
                Validator.required({ name })
                Validator.length({ name }, 2, 500)
            })
            && Validator.valid($('planType', content), () => {
                Validator.required({ type })
                Validator.length({ type }, 2, 100)
            })
            && Validator.valid($('planDescription', content), () => {
                Validator.required({ description })
                Validator.length({ description }, 2, 500)
            })
            && Validator.valid($('planPrice', content), () => {
                Validator.required({ price })
                Validator.isNumeric({ price })
            })
            && Validator.valid($('planAbility', content), () => {
                Validator.required({ ability })
                Validator.isNumeric({ ability })
            })
        
            if(!isValid) return false
    
            const result = await Memberships.editPlan(localStorage.getItem('planId'), { name, type, description, price: parseInt(price), ability: parseInt(ability) })

            if(!result) {
                Notify.notice('No se ha podido editar el plan', 'error')
                return
            }

            Notify.notice("Plan editado con éxito")

            super.modal.classList.remove('active')
            super.render(user, this, MembershipsLayout)
        })

        return content
    }

}

export default PlanLayout

function benefitItem(benefit) {
    return `
        <div class="tg-layout-plan-benefit">
            <h3>${benefit.name}</h3>
            <p><strong>Tipo:</strong> ${benefit.type}</p>
            <p>${benefit.description}</p>
            <p><strong>Estado:</strong> ${benefit.status} (${benefit.isActive ? 'Activo' : 'Inactivo'})</p>
            <br>
            <tg-button color="danger" size="xs" variant="dimed" id="benefitDeleteBtn_${benefit.id}"><span class="material-symbols-outlined">delete</span>Eliminar</tg-button>
        </div>
    `;
}

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
    <div class="tg-layout-memberships-plan-benefit tg-layout-memberships-plan-benefit-${benefit.isApplicable}" id="addedBenefit_${benefit.id}">
        <span class="material-symbols-outlined">${benefit.isApplicable ? 'check_circle' : 'cancel'}</span>
        <p>${benefit.name}</p>
    </div>
    `
}