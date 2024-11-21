import { PATH } from './configs/path.config.mjs'
import { MENU } from './configs/menu.config.mjs'
import { Auth } from '../modules/Auth.module.mjs'
import { Notify } from './utils/notify.mjs'
import { $ } from './utils/selectors.mjs'
import routes from './utils/routes.mjs'
import params from './utils/params.mjs'
import Layout from '../layouts/layout/Layout.mjs'
import AccountLayout from '../layouts/Account.layout.mjs'

var session = null;

document.addEventListener('DOMContentLoaded', () => {
    Auth.session(async (user) => {
        if (user) {
            startSession(user)
            startMenu(user)
            startModal()
        }
        else {
            routes.set(PATH.AUTH)
        }
    })
})

export const startSession = async (user) => {
    session = user
    
    Notify.notice(`Bienvenido a TrackrGym ${user.session.account.name}`)

    $('logoutBtn').whenClick(() => Auth.logout())
    $('userSessionName').innerText = user.session.account.name || "Sin nombre"
    $('userSessionRole').innerText = {Admin: 'Administrador', User: 'Cliente'}[user.role] || "Sin rol"
    $('userSessionPhoto').innerHTML = user.photoURL != null ? `<img src="${user.photoURL}">` : ''
    $('userSessionLayout').whenClick(() => Layout.render(session, AccountLayout))

    await Layout.render(session, AccountLayout)

    $('#loader').load(false)
}


const startMenu = (user) => {

    const items = MENU.ITEMS[user.role]
    
    items.forEach(item => {
        if(item.isVisible) {
            const navItem = document.createElement('tg-button')
            navItem.setAttribute('id', item.id)
            navItem.setAttribute('width', 'full')
            navItem.setAttribute('variant', 'plain')
            navItem.setAttribute('color', 'white')
            navItem.innerHTML = `
                <div class="tg-nav-btn">
                    <div class="tg-nav-btn-icon"><span class="material-symbols-outlined">${item.icon ?? close}</span></div>
                    <div class="tg-nav-btn-text">${item.label}</div>
                </div>
            `
            navItem.addEventListener('click', async () => {
                await activateMenuItem(items, item.id, navItem)
            })
            $('navItems').appendChild(navItem)
        }
    })

    async function activateMenuItem (items, id) {
        for (const item of items) {
            if (item.id == id) {
                await Layout.render(session, item.layout)
                $(id).setAttribute('variant', 'dimed')
                $(id).setAttribute('color', 'accent')
                $(id).setAttribute('disabled', 'true')
            } else {
                $(item.id).setAttribute('variant', 'plain')
                $(item.id).setAttribute('color', 'white')
                $(item.id).setAttribute('disabled', 'false')
            }
        }
    }

    let active

    if(localStorage.getItem('exemplare_storage') != null) {
        const storage = JSON.parse(localStorage.getItem('exemplare_storage'))
        active = storage.menuActive
        active ? $('nav').classList.add('tg-nav-disabled') : $('nav').classList.remove('tg-nav-disabled')
    }

    else {
        active = true
        localStorage.setItem('exemplare_storage', JSON.stringify({"menuActive": active}))
    }
    
    $('navToggle').whenClick(() => {
        $('nav').classList.toggle('tg-nav-disabled')
        localStorage.setItem('exemplare_storage', JSON.stringify({"menuActive": !active}))
    })
}

const startModal = () => {
    $('modal').addEventListener('click', (e) => {
        if(e.target.classList.contains('active')) {
            $('modal').classList.remove('active')
        }
    })
}

