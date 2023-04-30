class MyTooltip extends HTMLElement {
    constructor() {
        super();
        this.tooltipContainer;
        this.tooltipText = 'Please change me!';
        // attach shadow dom in open mode to allow accessing it from the outside of the web component
        this.attachShadow({ mode: 'open' });

        // Set template as the innerHTML to shadow dom, at this time it is just setting the attribute
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: var(--primary-color);
                    color: white;
                    zIndex: 10;
                    position: absolute;
                }

                ::slotted(.highlight) {
                    border: 1px solid red;
                }
            </style>
            <slot><slot>
            <span> (?)</span>
        `;
    }

    connectedCallback() {
        const tooltip = this.shadowRoot.querySelector('span');
        tooltip.addEventListener('mouseenter', this.showTooltip.bind(this));
        tooltip.addEventListener('mouseleave', this.hideTooltip.bind(this));
        tooltip.style.position = 'relative';
        this.shadowRoot.appendChild(tooltip);

        if (this.hasAttribute('text')) {
            this.tooltipText = this.getAttribute('text');
        }
    }

    showTooltip() {
        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.textContent = this.tooltipText;
        this.shadowRoot.appendChild(this.tooltipContainer);
    }

    hideTooltip() {
        this.shadowRoot.removeChild(this.tooltipContainer);
    }
}

customElements.define('show-tooltip', MyTooltip);