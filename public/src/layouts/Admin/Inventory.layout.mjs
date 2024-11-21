import Layout from '../layout/Layout.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import { $, $$ } from '../../scripts/utils/selectors.mjs'
import { filterRenderedElements } from "../../scripts/utils/novato.mjs";
import Inventory from '../../modules/Inventory.module.mjs';
import Table from '../components/Table.component.mjs';
import { GymSelector } from '../components/contextables/GymSelector.modaler.contextable.mjs';
import GymHeader from '../components/injectables/GymHeader.injectable.mjs';
import Memberships from '../../modules/Memberships.module.mjs';


class InventoryLayout extends Layout {

    static name = 'Inventario'

    static async render(context, user) {
        context.innerHTML = ""
        const content = await this.getContent(user)
        context.replaceChildren(content)
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-inventory-content')
        const gym = await Memberships.gym(localStorage.getItem('gymId'))
        const products = await Inventory.products()
        content.innerHTML = `
        <div id="iGymHeader"></div>

        <div class="tg-layout-inventory-inventory">
            <div class="tg-layout-inventory-inventory-filters">
                <div class="tg-layout-inventory-inventory-filter-input">
                    <span class="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar..." id="productsSearcher">
                </div>
                <div class="tg-layout-inventory-inventory-filters-selector">
                    <strong>Filtros: </strong>
                    <div class="tg-layout-inventory-inventory-filters-selectors" id="filters">
                        <tg-button class="tg-layout-filter" size="xs" radius="full" variant="dimed" color="danger">Máquina</tg-button>
                        <tg-button class="tg-layout-filter" size="xs" radius="full" variant="dimed" color="danger">Indumento</tg-button>
                        <tg-button class="tg-layout-filter" size="xs" radius="full" variant="dimed" color="danger">Instrumento</tg-button>
                        <tg-button size="xs" radius="full" variant="danger" color="danger" icon="true" id="flushFiltersBtn"><span class="material-symbols-outlined">delete</span></tg-button>
                    </div>
                </div>
                <br>
                <tg-button  color="black" id="inventoryBtn"><span class="material-symbols-outlined">add</span> Nuevo</tg-button>
            </div>
            <div class="tg-layout-inventory-inventory-items">
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

        $('inventoryBtn', content).whenClick(() => {
            super.popup(`
            <div class="tg-layout-booking-modal">
                <form class="tg-layout-form-form" id="inventoryForm">
                    <h2>Nuevo Producto</h2>
                    <br>
                    <div class="tg-layout-form-inputs">
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryName" name="name" type="text" autoComplete="off" required="required">
                            <label class="tg-layout-form-label" for="inventoryName">Nombre</label>
                        </div>
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryDescription" name="description" type="text" autoComplete="off" required="required">
                            <label class="tg-layout-form-label" for="inventoryDescription">Descripción</label>
                        </div>
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryType" name="type" type="text" autoComplete="off" required="required">
                            <label class="tg-layout-form-label" for="inventoryType">Tipo</label>
                        </div>
                        <div class="tg-layout-form-input-group-double">
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="inventoryPurchasePrice" name="purchasePrice" type="text" autoComplete="off" required="required">
                                <label class="tg-layout-form-label" for="inventoryPurchasePrice">Costo</label>
                            </div>
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="inventorySalePrice" name="salePrice" type="text" autoComplete="off" required="required">
                                <label class="tg-layout-form-label" for="inventorySalePrice">Precio</label>
                            </div>
                        </div>
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryStock" name="stock" type="number" autoComplete="off" required="required">
                            <label class="tg-layout-form-label" for="inventoryStock">Stock</label>
                        </div>
                    </div>
                    <br>
                    <tg-button width="full" color="black" id="inventoryFormBtn">Agregar</tg-button>
                </form>     
            </div>
            `)
            
        $('inventoryFormBtn').whenClick(async () => {
                const data = Object.fromEntries(new FormData($('inventoryForm')))
                const result = await Inventory.createProduct(data)
                if(result) Notify.notice('Producto agregado al inventario correctamente')
                super.modal.classList.remove('active')
                super.render(user, this)
            })
        })

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

export default InventoryLayout