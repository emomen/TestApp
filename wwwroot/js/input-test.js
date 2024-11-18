/*
asp tag helper
    - ++todo just test the built-in input helper and make sure that you can get it working with a lit component

lit component
    - you can have scoped css with the default shadow dom, but then certain things don't work 
    like bootstrap utility classes and trying to select elements within the shadow dom.

bootstrap
    - this only works (without a build step) if you change the render root to the element, 
    rather than the shadow dom. this is what the createRenderRoot function does.

jquery
    - this works even with the shadow dom, however you can't select any elements within the shadow dom. you
    can confirm this is true by using the shadow dom and clicking the 'New Color' and 'Print Count' buttons.
    The first button needs a selector for the 'testDiv' div so it doesn't work, but the second button
    only uses a selector for the 'body' element so it does work.

htmx
    - this only works with the render root set to the element instead of the shadow dom. Using the 
    shadow dom, the client doesn't even send a request.

alpine.js
    - ++todo see if you can make the lit component an alpine component and use a simple attribute like x-bind. also
    see if you can emulate x-bind like behavior using the native reactive properties of lit components.
 */

import { html, css, LitElement } from '../lib/lit-core.min.js';

export class InputTest extends LitElement {
    // static styles = css`div { border: dashed red; }`;

    static properties = {
        route: { type: String },
        shouldShow: {state: true},
        num: {state: true},
        values: {state: true},
        sum: {state: true},
    };

    constructor() {
        super();
        this.shouldShow = true;
        this.num = 1;
        this.val1 = 19382;
        this.val2 = 23843;
        this.sum = this.val1 + this.val2;
    }

    createRenderRoot() {
        return this;
    }

    getPinkTextStyle() {
        const style = css`color: orange;`;
        return style;
    }

    generateRandomColor() {
        return "rgb(" + Math.floor(Math.random() * 255)
            + "," + Math.floor(Math.random() * 255) + ","
            + Math.floor(Math.random() * 255) + ")";
    }

    changeColor() {
        $('#testDiv').css('background-color', this.generateRandomColor());
    }

    toggleShow() {
        this.shouldShow = !this.shouldShow;
    }

    setVisibility() {
        return this.shouldShow ? 'visible' : 'invisible';
    }

    removeFormatting(el) {
        el.value = el.value.replace(',', '');
    }
    addFormatting(el, val) {
        val = parseInt(el.value);
        el.value = val.toLocaleString();
    }

    render() {
        return html`
            <div>
                <!-- Inline CSS Test -->
                <p .style="${this.getPinkTextStyle()}">Inline CSS Test</p>

                <!-- Bootstrap Test -->
                <p class="text-decoration-underline text-success">Bootstrap test</p>
                
                <hr />
                
                <!-- JQuery Test -->
                <button @click=${this.changeColor}>New Color</button>
                <div id="testDiv" style="width: 120px; height: 20px;"></div>
                
                <hr />
                
                <!-- Another JQuery Test -->
                <button @click=${e => console.log($('body').children.length)}>Print Count</button>
                
                <hr />
                
                <!-- HTMX Test -->
                <p id="replaceMe">Before Request</p>
                <button hx-get="${this.route}" hx-trigger="click" hx-target="#replaceMe" hx-swap="innerHTML">Send Request</button>
                
                <hr />
                
                <!-- Alpine Replication Test -->
                <p class="${this.setVisibility()}">This text is not hidden</p>
                <p>Status: ${this.setVisibility()}</p>
                <button @click=${this.toggleShow}>Toggle</button>
                
                <hr />
                
                <!-- Number Display Test -->
                <p>${this.num.toLocaleString()}</p>
                <div>
                    <button @click=${e => this.num *= 2}>Times Two</button>
                </div>
                <div class="mt-2">
                    <button @click=${e => this.num = 1}>Reset</button>
                </div>
                
                <hr />

                <!-- Alpine Replication Test -->
                <div class="mt-3">
                    <p>${this.val1.toLocaleString()}</p>
                    <input type="text" value="${this.val1.toLocaleString()}" 
                        @focusin=${e => this.removeFormatting(e.srcElement)} 
                        @focusout=${e => this.addFormatting(e.srcElement, this.val1)}
                    />
                </div>
                <div class="mt-3">
                    <p>${this.val2.toLocaleString()}</p>
                    <input type="text" value="${this.val2.toLocaleString()}" 
                        @focusin=${e => this.removeFormatting(e.srcElement)} 
                        @focusout=${e => this.addFormatting(e.srcElement, this.val2)}
                    />
                </div>

                <div class="mt-3">
                    <p>${this.sum.toLocaleString()}</p>
                    <input type="text" value="${this.sum.toLocaleString()}" />
                </div>
            </div>
            `;
    }
}

customElements.define('input-test', InputTest);
