export class SpotContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                outline: none;
                border: none;
            }
            .nl-spot-image {
                width: 100%;
                border-radius: 16px;
            }

            .nl-spot-image-invert {
                filter: invert(0.9);
            }

          .nl-spot-card {
            width: 100%;
            height: 100%;
            border-radius: 16px;
            position: relative;
            transform-style: preserve-3d;
            transition: all 0.2s ease-out;
            box-shadow: 0 8px 30px rgba(14, 21, 47, 0.0);
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            will-change: backdrop-filter;
            overflow: hidden;
            display: grid;
            place-items: center;
          }

          .nl-spot-card:hover {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px) brightness(3);
            transform: scale(1.02);
            cursor: pointer;
          }

          .nl-spot {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            user-select: none;
            pointer-events: none;
            z-index: 100;
          }

          .nl-ripple {
            position: absolute;
            background: red;
            transform: translate(-50%, -50%);
            pointer-events: none;
            border-radius: 50%;
            animation: ripple 1s cubic-bezier(.11,.29,.18,.98);
        }
        
          @keyframes ripple {
            0% {
                width: 0px;
                height: 0px;
                opacity: 0.5;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
          }

          .nl-full {
            width: 100%;
            max-width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: #111;
            display: grid;
            place-items: center;
            border-radius: 0px;
            transition: none;
            z-index: 100;
          }

          .nl-full:hover {
            transform: scale(1);
          }

          .nl-full .nl-spot {
            opacity: 0;
          }

          .nl-full .nl-spot-image {
            border-radius: 0px;
            max-height: 90vh;
            object-fit: contain;
            transition: all 0.5s ease;
            animation: appear 0.5s ease;
          }

          @keyframes appear {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }

        </style>

        <div class="nl-spot-card" id="card"><div class="nl-spot" id="spot"></div><img class="nl-spot-image nl-spot-image-${this.getAttribute('variant')}" src="${this.getAttribute('src')}" alt=""><slot></slot></div>
      `;

        this.card = this.shadowRoot.querySelector('#card');
        this.spot = this.shadowRoot.querySelector('#spot');
        this.full = true;

        this.card.addEventListener('mousemove', (e) => {
            const { pageX, pageY } = e;
            const { left, top } = this.card.getBoundingClientRect();
            const w = this.card.clientWidth;
            const h = this.card.clientHeight;
            const offsetX = 0.52 - (pageX - left) / w;
            const offsetY = 0.52 - (pageY - top) / h;
            const dy = (pageY - top) - h / 2;
            const dx = (pageX - left) - w / 2;
            const arad = Math.atan2(dy, dx);
            let angle = arad * 180 / Math.PI - 90;

            if (angle < 0) {
                angle = angle + 360;
            }

            this.spot.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${(pageY - top) / h * 0.5}) 0%,rgba(255,255,255,0) 80%)`;
            this.spot.style.transform = `translateX(${offsetX - 0.1}px) translateY(${offsetY - 0.1}px)`;
        });

        this.card.addEventListener('mouseleave', () => {
            this.spot.style.cssText = '';
        });

        // this.card.addEventListener('click', () => {
        //     this.full ? this.card.classList.add('nl-full') : this.card.classList.remove('nl-full');
        //     this.full = !this.full;
        // });

    }
}

export default SpotContainer;