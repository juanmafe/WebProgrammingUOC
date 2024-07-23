import Score from './score/score.js';
import GameState from './game-state.js';
import Category from './question/category.js';
import Question from './question/question.js';
import QuestionToken from './question/question-token.js';

export default class Game {

    #gameState;

    #score;
    #category;
    #categories;

    #questionOptions;
    #questionToken;

    /**
     * Constructor.
     */
    constructor() {
        this.#gameState = new GameState();
        this.#score = new Score();
        this.#category = new Category();
        this.#questionToken = new QuestionToken();
        this.#init();
    }

    /**
     * Init.
     */
    #init() {
        this.#gameState.getStartButton().addEventListener('click', this.#newGame.bind(this));
        this.#gameState.clear();
    }

    /**
     * Initializes a new game.
     * Randomizes categories each time a new game is started, resets the score, and proceeds to the next question.
     */
    #newGame() {
        this.#gameState.start();
        this.#categories = this.#category.get();
        this.#score.reset();
        this.#nextQuestion();
    }

    /**
     * Retrieves the category for the next question and initializes it.
     * Waits for the question to be fetched and then sets up event listeners for question options.
     * Increments the score if the selected answer is correct.
     * Ends the game if the number of questions reaches 5, otherwise proceeds to the next question.
     */
    async #nextQuestion() {

        const category = this.#categories[this.#gameState.getNumberQuestion()];
        const questionToken = this.#questionToken.getSessionToken();

        const question = new Question(category, questionToken);

        await new Promise((resolve) => {

            question.get().then(() => {
                this.#questionOptions = document.querySelectorAll('[data-value]');

                this.#questionOptions.forEach(option => {

                    option.addEventListener('click', (event) => {
                        const isValidAnswer = question.isCorrectAnswer(event.target.dataset.value);
                        this.#checkQuestionAnswer(isValidAnswer);
                    });
                });
                this.#gameState.incrementNumberQuestion();
                resolve();
            });
        });
    }

    /**
     * Checks if the provided answer is valid, increments the score if valid, and proceeds to the next question or ends the game based on the current state.
     * 
     * @param {boolean} isValidAnswer - A boolean indicating if the answer provided is valid.
     */
    #checkQuestionAnswer(isValidAnswer){

        if (isValidAnswer) {
            this.#score.increment();
        }

        if (this.#gameState.isNumberQuestionReachesLimit()) {
            this.#gameState.end();
            return;

        } else {
            this.#nextQuestion();
        }
    }

}
