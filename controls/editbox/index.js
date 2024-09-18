class EditBox {
    constructor(params) {
        this._rootNode = params.rootNode;
        this._input = this._rootNode.querySelector('[rel="input"]');
        this._message = this._rootNode.querySelector('[rel="message"]')
            ? this._rootNode.querySelector('[rel="message"]')
            : null;
        this._messageText = this._message?.getAttribute('data-error');
        this._pattern = this._input.getAttribute('data-pattern')
            ? this._input.getAttribute('data-pattern')
            : '';
        this._isValid = this._input.getAttribute('data-verify-on-input')
            ? this._input.getAttribute('data-verify-on-input')
            : 'false';
        this._value = this._input.getAttribute('value')
            ? this._input.getAttribute('value')
            : null;
        this._placeholder = this._input.getAttribute('data-placeholder')
            ? this._input.getAttribute('data-placeholder')
            : '';
        this._addKeyupListener();
        this._collectInstances();
        this._onVerify = typeof params?.onVerify == 'function' ? params.onVerify : undefined;
        this._onVerify ? this._addOnVerifyListener(this._onVerify) : null;
        this.setValue();

        return this;
    }

    _addKeyupListener() {
        this._input.addEventListener('keyup', () => {
            this._value = this._input.value;
            this._input.setAttribute('value', this._value);
        })
    }

    _addOnVerifyListener(callback) {
        if(typeof callback == 'function') {
            function wrapper() {
                return callback.apply(EditBox.getInstance(this));
            }
            this._rootNode.addEventListener('verify', wrapper);
        }
    }

    _collectInstances() {
        EditBox.instances.push(this);
    }

    getRootNode() {
        return this._rootNode;
    }

    getValue() {
        return this._value;
    }

    setValue(value) {
        if (typeof(value) !== 'undefined') {
            if (typeof(value) === 'string') {
                this._input.setAttribute('value', value);
                this._value = value;
            }
        }
        return this;
    }

    verify() {
        console.log('verify!')
        if (this._input.value.match(this._pattern) === null) {
            console.log('1')
            this._input.setAttribute('data-verify-on-input', 'false');
            this._isValid = 'false';
            if (this._message) {
                this._message.textContent = this._messageText;
            }
        } else {
            console.log('2')
            this._input.setAttribute('data-verify-on-input', 'true');
            this._isValid = 'true';
            if (this._message) {
                this._message.textContent = '';
            }
        }
        const verifyEvent = new Event('verify', { bubbles: true });
        this._rootNode.dispatchEvent(verifyEvent);

        return this;
    }

    //for work 3 USER CASE
    onVerify(callback) {
        this._addOnVerifyListener(callback);
        return this;
    }

    static instances = [];

    static init() {
        const elements = document.querySelectorAll('[rel="control.editBox"]');
        elements.forEach(function(node) {
            new EditBox({rootNode: node});
        })
    }

    static getInstance(node) {
        let result = null;

        if (node instanceof Node) {
            EditBox.instances.forEach(function(element) {
                if (element._rootNode === node | element._rootNode.contains(node)) {
                    result = element;
                    return result;
                }
            })
        }
        return result;
    }
}