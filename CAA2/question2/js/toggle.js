const TOGGLE_STATUS_ON = 'toggle__status--on';

export default class Toggle {

    #ref;
    #refStatus;
    #status;

    /**
     * Constructor.
     * @param {*} refDom 
     */
    constructor(refDom) {
        // "Button" div.
        this.#ref = refDom;
        this.#init();
    }

    /**
     * Initializes the rest of the class attributes based on the #ref attribute initialized in the constructor.
     */
    #init() {
        // Unlike question 3 or index.html, here we only need one, so we use querySelector instead of querySelectorAll,
        // since the foreach is being executed in the index.html.
        this.#refStatus = this.#ref.querySelector('.js-toggle-status');
        // We use access to the data-*, in this case, data-status.
        // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        const status = this.#ref.dataset.status;
        // The only way I have found to cast a string to a boolean is using === 'true'.
        // https://sentry.io/answers/how-can-i-convert-a-string-to-a-boolean-in-javascript/
        this.#status = status === 'true';
        // This part was complicated. I was trying ("click", this.onClick()), but it didn't work.
        // Until I found, after a lot of research (searching toogle components in react by other users),
        // that we need the bind function with the "this" as argument,
        // so that the callback is created and it works finally.
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        // https://github.com/aaronshaf/react-toggle/blob/master/src/component/index.js
        this.#ref.addEventListener('click', this.#onClick.bind(this));
        this.#render();
    }

    /**
     * Changes the status to the opposite state when the mouse is clicked.
     */
    #onClick() {
        this.#status = !this.#status;
        this.#render();
    }

    /**
     * Updates the data.status reference, add and remove the on status toggle class
     * and update the text with ON or OFF in each case.
     */
    #render() {
        this.#ref.dataset.status = this.#status;
        this.#refStatus.textContent = this.#status ? 'ON' : 'OFF';
        this.#status ? this.#refStatus.classList.add(TOGGLE_STATUS_ON) : this.#refStatus.classList.remove(TOGGLE_STATUS_ON);
    }
}