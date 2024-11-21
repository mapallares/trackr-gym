import Notify from "../../scripts/utils/notify.mjs"
import { $ } from "../../scripts/utils/selectors.mjs"

class Layout {

    static name = $('layoutName')
    static back = $('layoutBack')
    static content = $('content')
    static loader = $('contentLoader')
    static modal = $('modal')

    static async render(user, layout, back) {
        Layout.loader.load()
        Layout.name.innerText = layout.name
        if(back) {
            Layout.back.style.display = 'block'
            Layout.back.whenClick(async () => {
                await Layout.render(user, back)
            })
        }
        else {
            Layout.back.style.display = 'none'
        }
        this.content.innerHTML = "";
        await layout.render(this.content, user)
        Layout.loader.load(false)
    }

    static async process(callback) {
        Layout.loader.load()
        await callback()
        Layout.loader.load(false)
    }

    static async popup(modal) {
        Layout.modal.classList.add('active')
        Layout.modal.innerHTML = modal
    }

}

export default Layout