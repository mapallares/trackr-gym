import { Tokens } from '../tokens.mjs';

const tokens = Tokens.light;

export class Input extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.properties = {
            color: ['accent', 'black', 'white', 'gray', 'success', 'warning', 'danger'], //default accent
            variant: ['solid', 'bordered', 'plain', 'dimed', 'stroke'], //default solid
            size: ['xs', 's', 'm', 'l', 'xl'], //default m
            radius: ['xs', 's', 'm', 'l', 'auto', 'full', 'circle', 'none'], //default customed accent for -size property
            status: ['normal', 'disabled', 'loading'], //default normal
            width: ['full', 'fit'], //default fit
            icon: ['true', 'false'], //default false
            type: ['button', 'submit', 'link'] //default button
        }
        this.attrs = ['color', 'variant', 'size', 'radius', 'disabled', 'loading', 'width', 'icon', 'leftIcon', 'rightIcon', 'type', 'href'];

        this.attrs.forEach((attr) => {
            this[attr] = this.getAttribute(attr);
        });
    }

    static get observedAttributes() {
        return ['color', 'variant', 'size', 'radius', 'disabled', 'loading', 'width', 'icon', 'leftIcon', 'rightIcon', 'type', 'href'];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const props = {
            color: this.getProperty('color', 'accent'),
            variant: this.getProperty('variant', 'solid'),
            size: this.getProperty('size', 'm'),
            radius: this.getProperty('radius', 'auto'),
            disabled: this.hasAttribute('disabled') && this.getAttribute('disabled') !== 'false',
            loading: this.hasAttribute('loading') && this.getAttribute('loading') !== 'false',
            width: this.getProperty('width', 'fit'),
            icon: (this.hasAttribute('icon') && this.getAttribute('icon') !== 'false') ? this.icon : 'false',
            leftIcon: this.leftIcon ? this.leftIcon : 'none',
            rightIcon: this.rightIcon ? this.rightIcon : 'none',
            type: this.getProperty('type', 'button'),
            href: this.href
        };

        const style = `
        <style>
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .tg-button {
                width: ${tokens[`--tg-width-${props.width}`]};
                height: ${tokens[`--tg-height-${props.size}`]};
                background: ${tokens[`--tg-color-${props.variant}-${props.color}`]};
                color: ${tokens[`--tg-color-text-on-${props.variant}-${props.color}`]};
                border: ${tokens[`--tg-border-${props.variant}`] == 'none' ? 'none' : tokens[`--tg-border-${props.variant}`] + ' ' + tokens[`--tg-color-text-on-${props.variant}-${props.color}`]};
                border-radius: ${props.radius != 'auto' ? tokens[`--tg-border-radius-${props.radius}`] : tokens[`--tg-border-radius-${props.radius}-${props.size}`]};
                font-size: ${tokens[`--tg-button-font-size-${props.size}`]};
                font-weight: 500;
                font-family: 'Poppins';
                margin: 0 0 20px 0;
                position: relative;
                overflow: hidden;
                user-select: none;
                transition: all 0.5s ease;
                outline: none;
            }

            .tg-button-content {
                width: 100%;
                height: 100%;
                display: flex;
                fltg-direction: row;
                align-items: center;
                justify-content: center;
                column-gap: 10px;
            }

            .tg-button:hover {
                opacity: 0.6;
            }

            .tg-button-screen {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }

            .tg-button:disabled {
                opacity: 0.6;
                filter: brightness(0.9);
            }

            .tg-button:disabled .tg-button-screen {
                opacity: 0;
            }

            .tg-ripple {
                position: absolute;
                z-index: 100;
                background: ${(props.variant == 'bordered' && props.color == 'gray') ? '#8f969d' : tokens[`--tg-color-text-on-${props.variant}-${props.color}`]};
                transform: translate(-50%, -50%);
                pointer-events: none;
                border-radius: 50%;
                animation: ripple 1s cubic-bezier(.11, .29, .18, .98);
            }
            
            @keyframes ripple {
                0% {
                    width: 0px;
                    height: 0px;
                    opacity: 0.5;
                }
            
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }

        </style>
      `;

        this.shadowRoot.innerHTML = style;

        const button = document.createElement('button');
        button.classList.add('tg-button');

        if(props.loading) {
            props.disabled = true;
        }

        if(props.disabled) {
            button.setAttribute('disabled', 'disabled');
        }

        button.innerHTML = `
      <div class="tg-button-screen" id="screen"></div>
      <div class="tg-button-content">
        ${props.loading ? `<tg-spinner color="${props.variant != 'solid' && props.color != 'white' ? props.color : (this.color != 'white' ? 'white' : 'black')}" size="${props.size}"></tg-spinner>` : `<slot></slot>`}
      </div>
      `;

        if (props.type == 'link') {
            button.addEventListener('click', () => {
                location.href = props.href;
            });
        }

        const Screen = button.querySelector('#screen');
        Screen.addEventListener('mousedown', (e) => {
            const rect = Screen.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.classList.add('tg-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            Screen.appendChild(ripple);
            ripple.addEventListener('animationend', () => {
                Screen.removeChild(ripple);
            });
        });

        this.shadowRoot.appendChild(button);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    getProperty(propertyName, defaultValue) {
        return (this[propertyName] && this.properties[propertyName].includes(this[propertyName])) ? this[propertyName] : defaultValue;
    }

}

export default Input;