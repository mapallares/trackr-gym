import { Tokens } from '../tokens.mjs';

const tokens = Tokens.light;

export class Loader extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.properties = {
            color: ['accent', 'dark', 'light', 'white', 'black', 'success', 'warning', 'danger'],
            size: ['xs', 's', 'm', 'l', 'xl'],
            scope: ['global', 'local']
            
        }

        this.attrs = ['color', 'size', 'scope', 'disabled'];

        this.attrs.forEach((attr) => {
            this[attr] = this.getAttribute(attr);
        });
    }

    static get observedAttributes() {
        return ['color', 'size', 'scope', 'disabled'];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const props = {
            color: this.getProperty('color', 'dark'),
            size: this.getProperty('size', 'xl'),
            scope: this.getProperty('scope', 'global'),
            disabled: this.hasAttribute('disabled') && this.getAttribute('disabled') !== 'false'
        };

        const spinner = {
            'accent': 'white',
            'dark': 'accent',
            'light': 'accent',
            'black': 'white',
            'white': 'black',
            'success': 'black',
            'warning': 'white',
            'danger': 'white'
        }

        const scopes = {
            global: {
                'position': 'fixed',
                'z-index': '1000'
            },
            local: {
                'position': 'absolute',
                'z-index': '99'
            }
        }

        const style = `
        <style>
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .tg-loader {
                width: 100%;
                height: 100%;
                background: ${tokens[`--tg-color-${props.color}`]};
                position: ${scopes[props.scope].position};
                top: 0;
                left: 0;
                z-index: ${scopes[props.scope]['z-index']};
                display: grid;
                place-items: center;
                transition: all 1s ease;
            }

            .tg-loader-disabled {
                opacity: 0;
                visibility: hidden;
            }

        </style>
      `;

        this.shadowRoot.innerHTML = style;

        const loader = document.createElement('div');
        loader.classList.add('tg-loader');
        loader.innerHTML = `<tg-spinner color="${spinner[props.color]}" size="${props.size}"></tg-spinner>`;

        this.shadowRoot.appendChild(loader);

        setTimeout(() => {
            if (props.disabled) {
                loader.classList.add('tg-loader-disabled');
            }
        }, 1);

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name && oldValue !== newValue) {
            this.render();
        }
    }

    getProperty(propertyName, defaultValue) {
        return (this[propertyName] && this.properties[propertyName].includes(this[propertyName])) ? this[propertyName] : defaultValue;
    }

    
    load(active = true) {
        this.setAttribute('disabled', !active); 
    }

}

export default Loader;