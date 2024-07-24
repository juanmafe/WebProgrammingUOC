const QUESTION_LIMIT = 5

export default class GameState {

    #startButton;
    #cancelButton;
    #discardButton;

    #questionSection;
    #pointsSection;
    #scoreSection;

    #progressBar;

    #numberQuestion;

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
        this.#startButton = document.querySelector('.js-new');
        this.#cancelButton = document.querySelector('.js-cancel');
        this.#discardButton = document.querySelector('.js-discard');
        this.#questionSection = document.querySelector('.js-question');
        this.#pointsSection = document.querySelector('.points');
        this.#scoreSection = document.querySelector('.js-score');
        this.#progressBar = document.querySelector('.progress-bar');

        this.#cancelButton.addEventListener('click', this.clear.bind(this));
        this.#discardButton.addEventListener('click', this.clear.bind(this));
    }

    /**
     * Initializes a new state game.
     */
    start() {
        this.#startButton.classList.add('d-none');
        this.#cancelButton.classList.remove('d-none');

        this.#questionSection.classList.remove('d-none');
        this.#pointsSection.classList.remove('d-none');
        this.#scoreSection.classList.add('d-none');
    }

    /**
     * Clears the state game.
     */
    clear() {
        this.#startButton.classList.remove('d-none');
        this.#cancelButton.classList.add('d-none');

        this.#questionSection.classList.add('d-none');
        this.#pointsSection.classList.add('d-none');
        this.#scoreSection.classList.add('d-none');

        this.#resetNumberQuestion();
    }

    /**
     * Ends the state game.
     */
    end() {
        this.#startButton.classList.remove('d-none');
        this.#cancelButton.classList.add('d-none');

        this.#questionSection.classList.add('d-none');
        this.#scoreSection.classList.remove('d-none');

        this.#resetNumberQuestion();
    }

    /**
     * Resets the number of questions to zero.
     */
    #resetNumberQuestion(){
        this.#numberQuestion = 0;
    }

    /**
     * Increments the number of questions by one.
     */
    incrementNumberQuestion(){
        this.#numberQuestion ++;
    }

    /**
     * Returns the current number of questions that have been answered.
     * 
     * @returns {number} The current number of questions answered.
     */
    getNumberQuestion(){
        return this.#numberQuestion;
    }

    /**
     * Determines if the number of questions has reached the final limit of 5.
     * 
     * @returns {boolean} True if the number of questions has reached 5, false otherwise.
     */
    isNumberQuestionReachesLimit(){
        return this.#numberQuestion >= QUESTION_LIMIT;
    }

    /**
     * Returns the start button element stored in the instance.
     * 
     * @returns {HTMLElement} The start button element.
     */
    getStartButton() {
        return this.#startButton;
    }

    /**
     * Activates the progress bar.
     */
    activeProgressBar() {
        this.#progressBar.style.display = 'block';
        this.#progressBar.classList.add('active');
    }

    /**
     * Disable the progress bar.
     */
    disableProgressBar() {
        this.#progressBar.classList.remove('active');
        this.#progressBar.style.display = 'none';
    }

}
