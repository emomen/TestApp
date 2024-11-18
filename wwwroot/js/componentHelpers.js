import { html } from '../lib/lit-core.min.js';

function addScripts() {
    return html`
        <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    `;
}

function addStyles() {
    return html`
        <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    `;
}

export { addScripts, addStyles };