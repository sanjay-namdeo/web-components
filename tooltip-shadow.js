const template = `
    <style>
        div {
            background-color: black;
            color: white;
            z-index: 10;
            position: absolute;
        }

        span {
            position: relative;
        }
    </style>
    <slot></slot>
    <span> (?)</span>
`;

class TooltipShadown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.tooltipContainer;
        this.tooltipText;
    }

    connectedCallback() {
        const tooltip = this.shadowRoot.querySelector('span');
        this.tooltipText = this.getAttribute('text');
        tooltip.addEventListener('mouseenter', this.showTooltip.bind(this));
        tooltip.addEventListener('mouseleave', this.hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltip);
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

customElements.define('show-tooltip-shadow', TooltipShadown);