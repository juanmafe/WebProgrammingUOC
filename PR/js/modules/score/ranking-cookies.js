export default class RankingCookies {

    /**
     * Constructor.
     */
    constructor() {
    }

    /**
     * Sets a cookie with the specified name, value, and expiration duration in days.
     * Creates a cookie with the provided name and value, setting its expiration based on the specified number of days.
     * https://stackoverflow.com/questions/37692598/set-expires-time-in-cookie-javascript
     * 
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value to be stored in the cookie.
     * @param {number} days - The number of days until the cookie expires.
     */
    set(name, value, days) {

        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    /**
     * Retrieves the value of a cookie by its name.
     * Searches for a cookie with the specified name and returns its value if found.
     * https://stackoverflow.com/questions/10730362/get-cookie-by-name
     * 
     * @param {string} name - The name of the cookie to retrieve.
     * @returns {string | undefined} The value of the cookie if found, or undefined if the cookie does not exist.
     */
    get(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

}