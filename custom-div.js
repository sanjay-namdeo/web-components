const templateDiv = `
    <style>
        div {
            background-color: black;
            color: white;
            border: 3px solid red;
        }
    </style>
    <p>Hey there!</p>
    <slot><slot>
`;

class CustomDiv extends HTMLDivElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = templateDiv;
        this.textAttr = 'Default text for p element';
    }

    connectedCallback() {
        const pSelector = this.shadowRoot.querySelector('p');
        if (this.hasAttribute('text')) {
            console.log('Attribute found with value', this.getAttribute('text'));
            this.textAttr = this.getAttribute('text');
        }
        pSelector.textContent = this.textAttr;
    }
}

customElements.define('custom-div', CustomDiv, { extends: 'div' });