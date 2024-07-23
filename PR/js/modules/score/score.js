import Ranking from './ranking.js';

const PLACEHOLDER_MESSAGE = 'Please enter a name';

export default class Score {

    #saveButton;
    #score;
    #ranking;

    #gameState;

    /**
     * Constructor.
     */
    constructor(gameState) {
        this.#ranking = new Ranking();
        this.#gameState = gameState;
        this.#init();
    }

    /**
     * Init.
     */
    #init() {
        this.#saveButton = document.querySelector('.js-save');
        this.#saveButton.addEventListener('click', this.#save.bind(this));
        this.#ranking.render();
        this.#score = 0;
        this.#render();
    }

    /**
     * Increases the player's score by 2 points and updates the display.
     */
    increment(){
        this.#score += 2;
        this.#render();
    }

    /**
     * Resets the player's score to zero and updates the display.
     */
    reset(){
        this.#score = 0;
        this.#render();
    }

    /**
     * Renders the player's score on the webpage.
     */
    #render() {
        const pointsElement = document.querySelector('.js-points');

        // Without the .toString(), it is not saved properly and gives an error.
        pointsElement.textContent = this.#score.toString();
    }

    /**
     * Saves the player's name and score to the ranking list.
     * Retrieves the player's name input from the DOM, validates it, and adds the player's data to the ranking list if the name is not empty.
     * If the player's name is empty, displays a placeholder message and focuses on the input field for correction.
     */
    #save(){
        const playerNameInput = document.querySelector('.js-username');
        const playerName = playerNameInput.value.trim();

        if (playerName === '') {
            playerNameInput.placeholder = PLACEHOLDER_MESSAGE;
            playerNameInput.focus();

        } else {
            const playerData = {
                name: playerName,
                score: this.#score
            };

            const newRanking = this.#ranking.get();
            newRanking.push(playerData);

            this.#ranking.set(newRanking);
            this.#ranking.render(newRanking);
        }
        // Cleaning name for next tries.
        playerNameInput.value = '';

        this.#gameState.clear();
    }
}