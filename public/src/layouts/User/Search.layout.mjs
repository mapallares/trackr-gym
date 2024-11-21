import Layout from '../layout/Layout.mjs'
import { $, $$ } from '../../scripts/utils/selectors.mjs'
import { filterRenderedElements } from "../../scripts/utils/novato.mjs"
import Memberships from '../../modules/Memberships.module.mjs'
import Inventory from '../../modules/Inventory.module.mjs'
import Table from '../components/Table.component.mjs'
import GymHeader from '../components/injectables/GymHeader.injectable.mjs'

class SearchLayout extends Layout {

    static name = 'Consultas'

    static async render(context, user) {
        context.innerHTML = ""
        const content = await this.getContent(user)
        context.replaceChildren(content)
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-search-content')
        const gym = await Memberships.gym(localStorage.getItem('gymId'))
        const products = await Inventory.products()
        content.innerHTML = `
        <div id="iGymHeader"></div>
        <div class="tg-layout-search-inventory">
            <div class="tg-layout-search-inventory-filters">
                <div class="tg-layout-search-inventory-filter-input">
                    <span class="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar..." id="productsSearcher">
                </div>
                <div class="tg-layout-search-inventory-filters-selector">
                    <strong>Filtros: </strong>
                    <div class="tg-layout-search-inventory-filters-selectors" id="filters">
                        <tg-button class="tg-layout-filter" size="xs" radius="full" variant="dimed" color="danger">Máquina</tg-button>
                        <tg-button class="tg-layout-filter" size="xs" radius="full" variant="dimed" color="danger">Indumento</tg-button>
                        <tg-button class="tg-layout-filter" size="xs" radius="full" variant="dimed" color="danger">Instrumento</tg-button>
                        <tg-button size="xs" radius="full" variant="danger" color="danger" icon="true" id="flushFiltersBtn"><span class="material-symbols-outlined">delete</span></tg-button>
                    </div>
                </div>
            </div>
            <div class="tg-layout-search-inventory-items">
                ${Table(products, 'productsTable', ['id', 'variantOfId', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'], false, {
                    name: "Nombre",
                    type: "Tipo",
                    description: "Descripción",
                    purchasePrice: "Precio de Compra",
                    salePrice: "Precio de Venta",
                    stock: "Cantidad",
                    isSaleProduct: "Se vende",
                    status: "Estado",
                    isActive: "Activo"
                })}
            </div>
        </div>
        `

        $('productsSearcher', content).addEventListener('input', (event) => {
            filterRenderedElements(event.target.value, $('productsTable', content), '.tg-layout-table-row')
        })

        $('flushFiltersBtn', content).whenClick(() => {
            $('productsSearcher').value = ''
            filterRenderedElements('', $('productsTable', content), '.tg-layout-table-row')
        })

        $$('.tg-layout-filter', $('filters', content)).forEach(filter => {
            filter.whenClick(() => {
                $('productsSearcher').value = filter.innerHTML
                filterRenderedElements(filter.innerHTML, $('productsTable', content), '.tg-layout-table-row')
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

export default SearchLayout