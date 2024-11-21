import Layout from '../layout/Layout.mjs'
import { $ } from '../../scripts/utils/selectors.mjs'
import Memberships from '../../modules/Memberships.module.mjs'
import Validator from '../../scripts/utils/validator.mjs'
import Notify from '../../scripts/utils/notify.mjs'
import Inventory from '../../modules/Inventory.module.mjs'
import InventoryLayout from './Inventory.layout.mjs'

class ProductLayout extends Layout {

    static name = 'Producto Editor'

    static async render(context, user) {
        context.innerHTML = ""
        context.replaceChildren(await this.getContent(user))
    }

    static async getContent(user) {
        const content = document.createElement('div')
        content.classList.add('tg-layout-benefits-content')
        let product = await Inventory.product(localStorage.getItem('productId'))
        content.innerHTML = `
            <div class="tg-layout-booking-modal">
                <form class="tg-layout-form-form" id="inventoryForm">
                    <h2>Editar Producto</h2>
                    <br>
                    <div class="tg-layout-form-inputs">
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryName" name="name" type="text" autoComplete="off" required="required" value="${product.name}">
                            <label class="tg-layout-form-label" for="inventoryName">Nombre</label>
                        </div>
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryDescription" name="description" type="text" autoComplete="off" required="required" value="${product.description}">
                            <label class="tg-layout-form-label" for="inventoryDescription">Descripción</label>
                        </div>
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryType" name="type" type="text" autoComplete="off" required="required" value="${product.type}">
                            <label class="tg-layout-form-label" for="inventoryType">Tipo</label>
                        </div>
                        <div class="tg-layout-form-input-group-double">
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="inventoryPurchasePrice" name="purchasePrice" type="text" autoComplete="off" required="required" value="${product.purchasePrice}">
                                <label class="tg-layout-form-label" for="inventoryPurchasePrice">Costo</label>
                            </div>
                            <div class="tg-layout-form-input-group">
                                <input class="tg-layout-form-input" id="inventorySalePrice" name="salePrice" type="text" autoComplete="off" required="required" value="${product.salePrice}">
                                <label class="tg-layout-form-label" for="inventorySalePrice">Precio</label>
                            </div>
                        </div>
                        <div class="tg-layout-form-input-group">
                            <input class="tg-layout-form-input" id="inventoryStock" name="stock" type="number" autoComplete="off" required="required" value="${product.stock}">
                            <label class="tg-layout-form-label" for="inventoryStock">Stock</label>
                        </div>
                    </div>
                    <br>
                    <div class="tg-layout-form-btn-colum-group">
                        <tg-button width="full" color="black" id="inventoryFormBtn">Actualizar</tg-button>
                        <tg-button width="full" variant="dimed" color="danger" id="productDeleteBtn">Eliminar</tg-button>
                    </div>
            
                </form>     
            </div>
        `

        $('inventoryFormBtn', content).whenClick(async () => {
            const data = Object.fromEntries(new FormData($('inventoryForm')))
            const result = await Inventory.editProduct(localStorage.getItem('productId'), data)
            if(result) Notify.notice('Producto del inventario editado correctamente')
            super.render(user, InventoryLayout)
        })

        $('productDeleteBtn', content).whenClick(async () => {
            try {
                await Inventory.deleteProduct(localStorage.getItem('productId'))
                Notify.notice('Producto eliminado con éxito')
                super.render(user, InventoryLayout)
            }
            catch(error) {
                Notify.notice('No se ha podido eliminar el prodcuto', 'warning')
            }
        })

        return content
    }

}

export default ProductLayout

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