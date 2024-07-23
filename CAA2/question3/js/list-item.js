export default class ListItem {

    #data;

    /**
     * Constructor.
     * @param {ITEM} data
     */
    constructor(data) {
        this.#data = data;
    }

    /**
     * Checks if the search term is found in the ITEM object or not.
     * @param {string} searchTerm
     * @returns True if the term is found and false if not.
     */
    match(searchTerm) {

        const values = Object.values(this.#data);

        for (const value of values) {

            // For regular values (jobTitle and email in this case).
            if (typeof value === 'string' && this.#matchTermIgnoreCase(value, searchTerm)) {
                return true;
            }

            // For name.
            if (typeof value === 'object' && value.first && value.last) {

                const fullName = `${value.first} ${value.last}`;
                if (this.#matchTermIgnoreCase(fullName, searchTerm)) {
                    return true;
                }

                const reverseFullName = `${value.last} ${value.first}`;
                if (this.#matchTermIgnoreCase(reverseFullName, searchTerm)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks if the search term matches.
     * @param {string} value
     * @param {string} searchTerm
     * @returns a boolean.
     */
    #matchTermIgnoreCase(value, searchTerm) {
        const searchTermTrimmed = searchTerm.trim();
        return value.toUpperCase().includes(searchTermTrimmed.toUpperCase());
    }

    /**
     * Renders the item.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
     * @returns the rendered item.
     */
    render() {
        return `
        <li class="contactlist__item contact">
            <div>
                <p class="contact__name"><strong>${this.#data.name.last}, ${this.#data.name.first}</strong></p>
                <p class="contact__job">${this.#data.jobTitle}</p>
                <p class="contact__email">
                    <a class="contact__email-link" href="mailto:${this.#data.email}">${this.#data.email}</a>
                </p>
            </div>
        </li>
        `;
    }
}
