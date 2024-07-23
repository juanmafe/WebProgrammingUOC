import { CATEGORY_LIST } from '../consts/category-list.js';
import Randomizer from '../utils/randomizer.js';
import Encoder from '../utils/encoder.js';

const API_URL = 'https://opentdb.com/api_category.php';
const ERROR_FETCHING_CATEGORIES = 'Error fetching categories:';
const ERROR_FETCHING_CATEGORY_IDS = 'Error fetching category IDs';

export class Category {

    #categoryIds;

    /**
     * Constructor.
     */
    constructor() {
        this.#init();
    }

    /**
     * Init.
     */
    #init() {
        this.#categoryIds = [];
        this.#fetchCategories();
    }

    /**
     * Asynchronous method to fetch question categories.
     * Makes a request to the API specified in the constant API_URL to retrieve categories.
     * If categories are successfully retrieved, filters and maps the category IDs based on the allowed category list.
     * If categories cannot be retrieved, an error message is logged.
     * 
     * @returns {Promise<void>} A promise that resolves when the category retrieval operations are completed.
     */
    async #fetchCategories() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            
            if (data.trivia_categories) {
                this.#categoryIds = data.trivia_categories
                    .filter(category => CATEGORY_LIST.includes(Encoder.htmlEntitiesDecode(category.name)))
                    .map(category => category.id);

            } else {
                console.error(ERROR_FETCHING_CATEGORIES);
            }
            
        } catch (error) {
            console.error(ERROR_FETCHING_CATEGORY_IDS, error);
        }
    }

    /**
     * Retrieves a randomized array of category IDs.
     * Returns a randomized array of category IDs from the stored list of category IDs.
     * 
     * @returns {Array<number>} A randomized array of category IDs.
     */
    get() {
        return Randomizer.randomizeArray(this.#categoryIds);
    }
}
