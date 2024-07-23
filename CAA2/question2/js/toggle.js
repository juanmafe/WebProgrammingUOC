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
        this.#refStatus = this.#ref.querySelector('.js-toggle-status');
        const status = this.#ref.dataset.status;
        this.#status = status === 'true';
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
