import RankingCookies from './ranking-cookies.js';

const EXPIRED_TIME_IN_DAYS = 10

export default class Ranking {

    #ranking;
    #cookies;

    /**
     * Constructor.
     */
    constructor() {
        this.#cookies = new RankingCookies();
        this.#init();
    }

    /**
     * Init.
     */
    #init() {
        this.#ranking = [];
        this.get();
    }

    /**
     * Retrieves the ranking data stored in the cookies.
     * Checks if the 'ranking' cookie exists in the document's cookies. If found,
     * parses the ranking data and assigns it to the internal ranking property.
     * 
     * @returns {Array | undefined} The ranking data if found in the cookies,
     * or undefined if the 'ranking' cookie is not present.
     */
    get() {
        if (document.cookie.includes('ranking=')) {
            this.#ranking = JSON.parse(this.#cookies.get('ranking'));
        }
        return this.#ranking;
    }

    /**
     * Sets the ranking data in the cookies with the specified expiration duration.
     * Converts the new ranking data to a JSON string and stores it in the 'ranking'
     * cookie with the specified expiration duration.
     * 
     * @param {Array} newRanking - The new ranking data to be stored in the cookies.
     */
    set(newRanking) {
        this.#cookies.set('ranking', JSON.stringify(newRanking), EXPIRED_TIME_IN_DAYS);
    }

    /**
     * Renders the ranking list on the webpage.
     * Retrieves the ranking list element from the DOM and populates it with the sorted ranking data.
     * If the ranking list is empty, displays a message indicating no records. Otherwise,
     * sorts the records by score in descending order and renders them on the webpage.
     */
    render() {

        const rankingList = document.querySelector('.js-list');

        if (this.#ranking.length === 0) {
            document.querySelector('.js-empty').classList.remove('d-none');
            
        } else {
            document.querySelector('.js-empty').classList.add('d-none');

            // Sorting records by score in descending order.
            this.#ranking.sort((a, b) => b.score - a.score);

            // Cleaning the examples.
            rankingList.innerHTML = '';

            this.#ranking.forEach((record, index) => {

                const rankingItem = document.createElement('li');
                rankingItem.classList.add('scoreboard__item');
            
                const position = document.createElement('p');
                position.classList.add('scoreboard__pos');
                position.textContent = index + 1;
                rankingItem.appendChild(position);
            
                const playerName = document.createElement('p');
                playerName.classList.add('scoreboard__name');
                playerName.textContent = record.name;
                rankingItem.appendChild(playerName);
            
                const points = document.createElement('p');
                points.classList.add('scoreboard__points');
                points.textContent = `${record.score} pts`;
                rankingItem.appendChild(points);
            
                rankingList.appendChild(rankingItem);
            });
        }
    }

}