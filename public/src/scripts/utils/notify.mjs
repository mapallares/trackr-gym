import { $ } from './selectors.mjs'
import * as novato from './novato.mjs'

export class Notify {

    static notifies = []

    static async notice(message, type = 'info', duration = 6000) {
        let notify = {
            "id": `notify-${novato.UUID()}`,
            "type": type,
            "message": message,
            "height": 60
        }
        let notifyCard = document.createElement("div")
        notifyCard.classList.add("notify-card")
        notifyCard.classList.add(`notify-card-${notify.type}`)
        notifyCard.setAttribute("id", notify.id)
        notifyCard.innerHTML = `<div><span class="material-symbols-outlined">${{info: 'info', warning: 'warning', sucess: 'check', error: 'close'}[notify.type]}</span></div>`
        notifyCard.innerHTML += `<p>${notify.message}</p>`
        notifyCard.style.top = this.notifies.reduce((first, second) => first + second.height + 20, 0) + 20 + "px"
        notifyCard.addEventListener("click", () => {
            this.closeNotify(notify.id)
        })
        document.body.appendChild(notifyCard)
        notify.height = $(notify.id).offsetHeight
        this.notifies.push(notify)
        new Promise((resolve) =>
        setTimeout(() => {
            this.closeNotify(notify.id)
            resolve()
        }, duration))
        return notify
    }
    
    static async closeNotify(id) {
        let notifyCard = null
        if(this.notifies.length > 0) {
            this.notifies.forEach(function(notify) {
                if(id == notify.id) {
                    if($(notify.id) != null) {
                        notifyCard = $(id)
                        notifyCard.classList.add("notify-card-out")
                    }
                }
            })
            await new Promise((resolve) =>
            setTimeout(() => {
                resolve()
            }, 1000))
            if(notifyCard != null) {
                notifyCard.remove()
            }
            this.notifies = this.notifies.filter(fil => fil.id != id)
            this.resizeNotifies()
        }
    }
    
    static async resizeNotifies() {
        if (this.notifies.length > 0) {
            this.notifies.forEach((notify, index) => {
                const notifyElement = document.getElementById(notify.id);
                if (notifyElement != null) {
                    const newTop = this.notifies.slice(0, index).reduce((acc, prevNotify) => acc + prevNotify.height + 20, 20);
                    notifyElement.style.top = `${newTop}px`;
                }
            });
        }
    }

}

export default Notify

class NotifyElement extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    static get observedAttributes() {
        return ['type', 'duration']
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name && oldValue !== newValue) {
            this.render()
        }
    }

    getAttribute(propertyName, defaultValue) {
        return (this[propertyName] && this.properties[propertyName].includes(this[propertyName])) ? this[propertyName] : defaultValue
    }
    
    setAttribute(name, value) {
        this[name] = value
    }

    render() {

        const attributes = ['type', 'duration']

        attributes.forEach((attr) => {
            this[attr] = this.getAttribute(attr)
        })


        const style = `
        <style>
            .notify-card {
                width: fit-content
                max-width: 400px
                padding: 14px
                color: #fff
                font-size: 12px
                background: #222
                position: fixed
                right: 20px
                border: 0.001rem solid rgba(255, 255, 255, 0.1)
                border-radius: 5px
                animation: lefttoright 0.5s ease
                user-select: none
                transition: all 1s ease
                overflow: hidden
                z-index: 10000
            }

            .notify-card::after {
                content: ""
                width: 100%
                height: 3px
                background-color: var(--ex-color-accent)
                position: absolute
                bottom: 0px
                left: 0
                animation: notifyload ${this.duration || 6}s linear
            }

            .notify-card-info::after {
                background-color: var(--ex-color-accent)
            }

            .notify-card-success::after {
                background-color: var(--ex-color-success)
            }

            .notify-card-warning::after {
                background-color: var(--ex-color-warning)
            }

            .notify-card-error::after {
                background-color: var(--ex-color-danger)
            }

            .notify-card-out {
                transform: translateX(150%)
            }

            @keyframes lefttoright {
                from {
                    transform: translateX(100%)
                }

                to {
                    transform: translateX(0%)
                }
            }

            @keyframes notifyload {
                from {
                    width: 0%
                }

                to {
                    width: 100%
                }
            }
        </style>
        `

        this.shadowRoot.innerHTML = style
        this.shadowRoot.innerHTML += `<div class="notify-card notify-card-${this.type || "info"}"><slot></slot></div>`
    }

}

customElements.define('notify-notice', NotifyElement)