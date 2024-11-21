import {Tokens} from '../tokens.mjs';

const tokens = Tokens.light;

export class Spinner extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.properties = {
            color: ['accent', 'black', 'white', 'gray', 'success', 'warning', 'danger'],
            size: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
        }
        this.color = this.getAttribute('color');
        this.size = this.getAttribute('size');
    }

    static get observedAttributes() {
        return ['color'];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const color = this.getProperty('color', 'light');
        const size = this.getProperty('size', 'm');
        const style = `
        <style>
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                outline: none;
                border: none;
                --tg-spinner-color-accent: ${tokens['--tg-color-solid-accent']};
                --tg-spinner-color-black: ${tokens['--tg-color-solid-black']};
                --tg-spinner-color-white: ${tokens['--tg-color-solid-white']};
                --tg-spinner-color-gray: ${tokens['--tg-color-solid-gray']};
                --tg-spinner-color-success: ${tokens['--tg-color-solid-success']};
                --tg-spinner-color-warning: ${tokens['--tg-color-solid-warning']};
                --tg-spinner-color-danger: ${tokens['--tg-color-solid-danger']};
                --tg-spinner-size-xs: 10px;
                --tg-spinner-size-s: 15px;
                --tg-spinner-size-m: 20px;
                --tg-spinner-size-l: 25px;
                --tg-spinner-size-xl: 30px;
                --tg-spinner-size-xxl: 35px;
                --tg-spinner-size-xxxl: 40px;
            }

            .tg-spinner {
                width: var(--tg-spinner-size-${size});
                height: var(--tg-spinner-size-${size});
                aspect-ratio: 1;
                border-radius: 50%;
                background: radial-gradient(farthest-side, var(--tg-spinner-color-${color}) 100%, #0000) top/3px 3px no-repeat, conic-gradient(#0000 30%, var(--tg-spinner-color-${color}));
                mask: radial-gradient(farthest-side, #0000 calc(100% - 3px), #000 0);
                -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 3px), #000 0);
                animation: tg-spin 1s infinite linear;
                will-change: transform;
            }
        
            @keyframes tg-spin {
                100%{transform: rotate(1turn)}
            }
        </style>
      `;

      this.shadowRoot.innerHTML = style;

      const spinner = document.createElement('div');
      spinner.classList.add('tg-spinner');
      this.shadowRoot.appendChild(spinner);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
          this.render();
        }
      }

    getProperty(propertyName, defaultValue) {
        return (this[propertyName] && this.properties[propertyName].includes(this[propertyName])) ? this[propertyName] : defaultValue;
    }

}

export default Spinner;