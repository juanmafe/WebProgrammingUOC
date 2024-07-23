const API_URL = 'https://opentdb.com/api_token.php';
const ERROR_FETCHING_TOKEN = 'Error fetching token from opentdb.com:';

export default class QuestionToken {

    #sessionToken;

    /**
     * Constructor.
     */
    constructor() {
        this.#init();
    }

    /**
     * Init.
     */
    async #init() {
        await new Promise((resolve) => {
            this.#retriveSessionToken().then(resolve);
        });
    }

    /**
     * Retrieves the session token for API authentication.
     * Checks if a session token is already available and returns it.
     * If not, sends a request to the API to obtain a new session token.
     * 
     * @returns {string} The session token for API authentication.
     */
    async #retriveSessionToken() {

        if (this.#sessionToken) {
            return this.#sessionToken;

        } else {
            const url = new URL(API_URL);
            url.searchParams.append('command', 'request');

            try {
                const response = await fetch(url);
                const data = await response.json();
                this.#sessionToken = data.token;
                return this.#sessionToken

            } catch (error) {
                console.error(ERROR_FETCHING_TOKEN, error);
            }
        }
    }

    /**
     * Retrieves the current session token.
     * 
     * @returns {string} The current session token.
     */
    getSessionToken() {
        return this.#sessionToken;
    }
}