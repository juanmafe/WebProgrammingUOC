import ListItem from './list-item.js';

/**
 * Debounce generic method.
 * https://www.joshwcomeau.com/snippets/javascript/debounce/
 * @param {function} callback
 * @param {number} wait
 * @returns callback delayed.
 */
const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

export default class FilterList {

    #refList;
    #refSearch;
    #items;

    /**
     * Constructor.
     * @param {string} listSelector
     * @param {string} searchSelector
     * @param {LIST_DATA} dataset
     */
    constructor(listSelector, searchSelector, dataset) {
        this.#refList = document.querySelector(listSelector);
        this.#refSearch = document.querySelector(searchSelector);
        this.#init(dataset);
    }

    /**
     * Initializes the items list, add an keyup event to refSearch and renders the list.
     * @param {LIST_DATA} dataset
     */
    #init(dataset) {
        this.#items = dataset.map(data => new ListItem(data));

        // Creating delay to optimize search performance by not launching so many requests.
        const handleKeyUp = debounce((ev) => {
            this.#onSearchChanged(ev);
          }, 300);

        this.#refSearch.addEventListener('keyup', handleKeyUp);
        this.#render();
    }

    /**
     * Render de result list.
     */
    #render() {
        // We clean the previous rendering and we also delete the mock template in the first rendering.
        // https://developer.mozilla.org/es/docs/Web/API/Element/innerHTML
        this.#refList.innerHTML = '';

        this.#items.forEach(item => {

            if (item.match(this.#refSearch.value)) {
                this.#refList.innerHTML += item.render();
            }
        });
    }

    /**
     * When the keyup event is fired, the result rendering is updated.
     * @param {Event} ev  event info, it isn't used.
     */
    #onSearchChanged(ev) {
        this.#render();
    }

}
