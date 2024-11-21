import Layout from '../layout/Layout.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import Memberships from '../../modules/Memberships.module.mjs'
import { UDC } from '../../scripts/utils/novato.mjs'
import { GymSelector } from '../components/contextables/GymSelector.modaler.contextable.mjs'
import GymHeader from '../components/injectables/GymHeader.injectable.mjs'
import Table from '../components/Table.component.mjs'
import BenefitLayout from './Benefits.layout.mjs'
import PlanLayout from './Plan.layout.mjs'
import Validator from '../../scripts/utils/validator.mjs'
import Notify from '../../scripts/utils/notify.mjs'

class MembershipsLayout extends Layout {

    static name = 'Membresías'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-memberships-content')
        const gym = await Memberships.gym(localStorage.getItem('gymId'))
        const plans = await Memberships.plans(localStorage.getItem('gymId'))
        const memberships = await Memberships.allMemberships()
        console.log(memberships)
        content.innerHTML = `
        <div class="tg-layout-content-padding">
            <div id="iGymHeader"></div>
        </div>
        <div class="tg-layout-memberships-flex-title-btns">
            <div class="tg-layout-memberships-flex-title">
                <h1>Planes</h1>
            </div>
            <div class="tg-layout-memberships-flex-btns">
                <div class="tg-layout-memberships-flex-btns-content">
                    <tg-button color="black" variant="dimed" radius="none" id="benefitsBtn"><span class="material-symbols-outlined">add</span> Beneficio</tg-button>
                    <tg-button color="black" radius="none" id="planBtn"><span class="material-symbols-outlined">add</span> Plan</tg-button>
                </div>
            </div>
        </div>
        <div class="tg-layout-memberships-plans-content">
            <div class="tg-layout-memberships-plans">
            ${plans.length > 0 ? plans.map(plan => planCard(plan)).join('') : '<div class="tg-layout-memberships-plans-empty">No hay planes disponibles</div>'}
            </div>
        </div>
        <br>
        <h1 class="tg-layout-memberships-title">Membresías</h1>
        <div class="tg-layout-content-padding">
        </div>
        <div class="tg-layout-memberships-tables" style="width: 100%; overflow: auto;">
            ${Table(memberships, 'memberships')}
        </div>
        `

        $('benefitsBtn', content).whenClick(() => {
            super.render(user, BenefitLayout, this)
        })

        $('planBtn', content).whenClick(() => {
            super.popup(`
                <div class="tg-layout-memberships-plan-modal">
                    <form class="tg-layout-form-form" id="planForm">
                        <center><h2>Nuevo Plan</h2></center>
                        <div class="tg-layout-form-inputs">
                            <div class="tg-layout-form-input-group-double">
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planName" name="name" type="text" autoComplete="off" required="required">
                                    <label class="tg-layout-form-label" htmlFor="planName">Nombre</label>
                                </div>
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planType" name="type" type="text" required="required">
                                    <label class="tg-layout-form-label" htmlFor="planType">Tipo</label>
                                </div>
                            </div>
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="planDescription" name="description" type="text" required="required">
                                <label class="tg-layout-form-label" htmlFor="planDescription">Description</label>
                            </div>
                            <div class="tg-layout-form-input-group-double">
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planPrice" name="price" type="number" autoComplete="off" required="required">
                                    <label class="tg-layout-form-label" htmlFor="planPrice">Precio</label>
                                </div>
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="planAbility" name="ability" type="number" required="required">
                                    <label class="tg-layout-form-label" htmlFor="planAbility">Capacidad</label>
                                </div>
                            </div>
                        </div>
                        <br>
                        <tg-button width="full" color="black" id="planFormBtn">Crear</tg-button>
                    </form>     
                </div>
            `)

            $('planFormBtn').whenClick(async () => {
                const data = Object.fromEntries(new FormData($('planForm')))
                const { name, type, description, price, ability } = data
        
                const isValid = 
                Validator.valid($('planName'), () => {
                    Validator.required({ name })
                    Validator.length({ name }, 2, 500)
                })
                && Validator.valid($('planType'), () => {
                    Validator.required({ type })
                    Validator.length({ type }, 2, 100)
                })
                && Validator.valid($('planDescription'), () => {
                    Validator.required({ description })
                    Validator.length({ description }, 2, 500)
                })
                && Validator.valid($('planPrice'), () => {
                    Validator.required({ price })
                    Validator.isNumeric({ price })
                })
                && Validator.valid($('planAbility'), () => {
                    Validator.required({ ability })
                    Validator.isNumeric({ ability })
                })
            
                if(!isValid) return false
        
                const result = await Memberships.createPlan(localStorage.getItem('gymId'), { name, type, description, price: parseInt(price), ability: parseInt(ability) })

                if(!result) {
                    Notify.notice('No se ha podido crear el plan', 'error')
                    return
                }

                Notify.notice("Plan creado con éxito")

                super.modal.classList.remove('active')
                super.render(user, this)
            })

        })

        plans.forEach(plan => {
            $(`editPlanBtn_${plan.id}`, content).whenClick(() => {
                localStorage.setItem('planId', plan.id)
                super.render(user, PlanLayout, this)
            })
        })

        const injectables = {
            'iGymHeader': GymHeader
        }
        for(const injectable in injectables) {
            $(injectable, content).replaceChildren(await injectables[injectable](user, this, gym))
        }
        
        return content
    }

}

export default MembershipsLayout

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
            ${plan.benefits.length > 0 ? plan.benefits.map(plan => planBenefitItem(plan)).join('') : '<div class="tg-layout-memberships-plans-empty">Plan sin beneficios</div>'}
        </div>
        <br>
        <tg-button size="s" width="full" color="black" id="editPlanBtn_${plan.id}">Editar</tg-button>
    </div>
    `
}

function planBenefitItem(plan) {
    return `
    <div class="tg-layout-memberships-plan-benefit tg-layout-memberships-plan-benefit-${plan.isApplicable}">
        <span class="material-symbols-outlined">${plan.isApplicable ? 'check_circle' : 'cancel'}</span>
        <p>${plan.name}</p>
    </div>
    `
}