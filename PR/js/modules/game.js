import { Category } from './question/category.js';
import Score from './score/score.js';
import { Question } from './question/question.js';
import { QuestionToken } from './question/question-token.js';

export default class Game {

    #startButton;
    #cancelButton;
    #discardButton;

    #questionSection;
    #pointsSection;
    #scoreSection;

    #numberQuestion;
    #questionOptions;
    #token

    #score;
    #category;
    #categories;

    /**
     * Constructor.
     */
    constructor() {
        this.#score = new Score();
        this.#category = new Category();
        this.#token = new QuestionToken();
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

        this.#startButton.addEventListener('click', this.#newGame.bind(this));
        this.#cancelButton.addEventListener('click', this.#clearGame.bind(this));
        this.#discardButton.addEventListener('click', this.#clearGame.bind(this));

        this.#clearGame();
    }

    /**
     * Initializes a new game.
     * Randomizes categories each time a new game is started, resets the score, and proceeds to the next question.
     */
    #newGame() {
        this.#startButton.classList.add('d-none');
        this.#cancelButton.classList.remove('d-none');

        this.#questionSection.classList.remove('d-none');
        this.#pointsSection.classList.remove('d-none');
        this.#scoreSection.classList.add('d-none');

        this.#categories = this.#category.get();
        this.#score.reset();

        this.#nextQuestion();
    }

    /**
     * Clears the game.
     * Resets the number of questions to zero.
     */
    #clearGame() {
        this.#startButton.classList.remove('d-none');
        this.#cancelButton.classList.add('d-none');

        this.#questionSection.classList.add('d-none');
        this.#pointsSection.classList.add('d-none');
        this.#scoreSection.classList.add('d-none');

        this.#resetNumberQuestion();
    }

    /**
     * Retrieves the category for the next question and initializes it.
     * Waits for the question to be fetched and then sets up event listeners for question options.
     * Increments the score if the selected answer is correct.
     * Ends the game if the number of questions reaches 5, otherwise proceeds to the next question.
     */
    async #nextQuestion() {

        const category = this.#categories[this.#numberQuestion];

        const question = new Question(category, this.#token.getSessionToken());

        await new Promise((resolve) => {
            question.get().then(() => {

                this.#questionOptions = document.querySelectorAll('[data-value]');

                this.#questionOptions.forEach(option => {
                    option.addEventListener('click', (event) => {

                        const isValidAnswer = question.isCorrectAnswer(event.target.dataset.value);

                        if (isValidAnswer) {
                            this.#score.increment();
                        }

                        if (this.#numberQuestion >= 5) {
                            this.#endGame();
                            return;

                        } else {
                            this.#nextQuestion();
                        }
                    });
                });
                this.#numberQuestion ++;
                resolve();
            });
        });
    }

    /**
     * Ends the game.
     * Resets the number of questions to zero.
     */
    #endGame() {
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
}
