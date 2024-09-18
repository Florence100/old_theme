class SubmitBox extends EditBox {
    constructor(params) {
        super(params);
        this._buttonSubmit = this._rootNode.querySelector('[rel="submitbox.button"]');
        this._addListenerButton();
    }

    _submit(event) {
        event.preventDefault();
        super.verify();
    }

    _addListenerButton() {
        this._buttonSubmit.addEventListener('click', (event) => {
            this._submit(event);
        })
    }

    static init() {
        const elements = document.querySelectorAll('[rel="control.submitbox"]');
        elements.forEach(function(node) {
            new SubmitBox({rootNode: node});
        })
    }
}