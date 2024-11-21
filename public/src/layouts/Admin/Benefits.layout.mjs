import Layout from '../layout/Layout.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import Memberships from '../../modules/Memberships.module.mjs'
import Validator from '../../scripts/utils/validator.mjs'
import Notify from '../../scripts/utils/notify.mjs'

class BenefitsLayout extends Layout {

    static name = 'Beneficios'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-benefits-content')
        let benefits = await Memberships.benefits(localStorage.getItem('gymId'))

        const renderBenefits = async () => {
            benefits = await Memberships.benefits(localStorage.getItem('gymId'))

            $('benefits', content).innerHTML = `
                ${benefits.length > 0 ? benefits.map(benefit => benefitItem(benefit)).join('') : '<div class="tg-layout-benefits-empty">No ha creado ningún beneficio</div>'}
            `
            
            benefits.forEach(benefit => {
                $(`#benefitDeleteBtn_${benefit.id}`, content).whenClick(async () => {
                    const deleted = await Memberships.deleteBenefit(benefit.id)
    
                    await renderBenefits()
    
                    if(deleted) {
                        Notify.notice('Beneficio eliminado con éxito')
                    }
                    else {
                        Notify.notice('No se ha podido eliminar el benificio', 'warning')
                    }
    
                })
            })
        }

        content.innerHTML = `
                <div class="tg-layout-benefits-form">
                    <form class="tg-layout-form-form" id="benefitForm">
                        <center><h2>Nuevo beneficio</h2></center>
                        <br>
                        <div class="tg-layout-form-inputs">
                            <div class="tg-layout-form-input-group-double">
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="benefitName" name="name" type="text" required="required">
                                    <label class="tg-layout-form-label" for="benefitName">Nombre</label>
                                </div>
                                <div class="tg-layout-form-input-group">
                                    <input class="tg-layout-form-input" id="benefitType" name="type" type="text" required="required">
                                    <label class="tg-layout-form-label" for="benefitType">Tipo</label>
                                </div>
                            </div>
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="benefitDescription" name="description" type="text" required="required">
                                <label class="tg-layout-form-label" for="benefitDescription">Descripción</label>
                            </div>
                        </div>
                        <br>
                        <tg-button width="full" color="black" id="benefitFormBtn">Añadir</tg-button>
                    </form>     
                    </div>
                <div class="tg-layout-benefits-card">
                    <div class="tg-layout-benefits-card-body" id="benefits">
                    </div>
                </div>
            </div>
        `

        await renderBenefits()

        $('benefitFormBtn', content).whenClick(async () => {
            const data = Object.fromEntries(new FormData($('benefitForm', content)))
            const { name, type, description } = data
    
            const isValid = 
            Validator.valid($('benefitName', content), () => {
                Validator.required({ name })
                Validator.length({ name }, 2, 500)
            })
            && Validator.valid($('benefitType', content), () => {
                Validator.required({ type })
                Validator.length({ type }, 2, 100)
            })
            && Validator.valid($('benefitDescription', content), () => {
                Validator.required({ description })
                Validator.length({ description }, 2, 500)
            })
        
            if(!isValid) return false
    
            await Memberships.createBenefit(localStorage.getItem('gymId'), { name, type, description })

            Notify.notice('Beneficio creado con éxito')

            $('benefitName', content).value = ''
            $('benefitType', content).value = ''
            $('benefitDescription', content).value = ''
            
            renderBenefits()

        })
        
        return content
    }

}

export default BenefitsLayout

function benefitItem(benefit) {
    return `
        <div class="tg-layout-benefits-benefit">
            <h3>${benefit.name}</h3>
            <p><strong>Tipo:</strong> ${benefit.type}</p>
            <p>${benefit.description}</p>
            <p><strong>Estado:</strong> ${benefit.status} (${benefit.isActive ? 'Activo' : 'Inactivo'})</p>
            <br>
            <tg-button color="danger" size="xs" variant="dimed" id="benefitDeleteBtn_${benefit.id}"><span class="material-symbols-outlined">delete</span>Eliminar</tg-button>
        </div>
    `;
}