import Randomizer from '../utils/randomizer.js';
import Encoder from '../utils/encoder.js';

const API_URL = 'https://opentdb.com/api.php';
const ERROR_FETCHING_QUESTION = 'Error fetching question from opentdb.com:';

export class Question {

    #category;
    #sessionToken;
    #correctAnswer;

    /**
     * Constructor.
     * 
     * @param {string} category - The category for the quiz questions.
     * @param {string} sessionToken - The session token for API authentication.
     */
    constructor(category, sessionToken) {
        this.#category = category;
        this.#sessionToken = sessionToken;
    }

    /**
     * Asynchronously retrieves a question, decodes it, and renders it on the webpage.
     */
    async get() {

        const fetchedQuestion  = await new Promise((resolve) => {
            this.#fetch().then(resolve);
        });

        if (fetchedQuestion) {
            const decodedQuestion = this.#getDecodedQuestion(fetchedQuestion);
            const decodedAnswers = this.#getDecodedAnswers(fetchedQuestion);
            this.#render(decodedQuestion, Randomizer.randomizeArray(decodedAnswers));
        }
    }

    /**
     * Asynchronously fetches a question from the Open Trivia Database API.
     * 
     * @returns {Object} The fetched question data.
     */
    async #fetch() {

        const url = new URL(API_URL);
        url.searchParams.append('amount', '1');
        url.searchParams.append('category', this.#category);
        url.searchParams.append('token', this.#sessionToken);

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results[0];

        } catch (error) {
            console.error(ERROR_FETCHING_QUESTION, error);
        }
    }

    /**
     * Decodes the question retrieved from the API.
     * 
     * @param {Object} fetchedQuestion - The question object retrieved from the API.
     * @returns {string} The decoded question text.
     */
    #getDecodedQuestion(fetchedQuestion) {
        return Encoder.htmlEntitiesDecode(fetchedQuestion.question);
    }

    /**
     * Decodes the answers retrieved from the API.\
     * 
     * @param {Object} fetchedQuestion - The question object retrieved from the API.
     * @returns {Array<string>} An array of decoded answers including the correct answer.
     */
    #getDecodedAnswers(fetchedQuestion) {
        this.#correctAnswer = Encoder.htmlEntitiesDecode(fetchedQuestion.correct_answer);
        const decodedIncorrectAnswers = fetchedQuestion.incorrect_answers.map(answer => Encoder.htmlEntitiesDecode(answer));
        return [this.#correctAnswer, ...decodedIncorrectAnswers];
    }

    /**
     * Renders the question and answer options on the webpage.
     * 
     * @param {string} question - The decoded question text to be displayed.
     * @param {Array<string>} answers - An array of decoded answer options to be displayed.
     */
    #render(question, answers) {

        const questionElement = document.querySelector('.js-question');

        questionElement.innerHTML = `
            <p class="question__statement">${question}</p>
            <ul class="question__answers">
                ${answers.map(answer => `<li class="question__option" data-value="${answer}">${answer}</li>`).join('')}
            </ul>
        `;
    }

    /**
     * Checks if the provided answer matches the correct answer.
     * 
     * @param {string} answer - The answer to be checked against the correct answer.
     * @returns {boolean} True if the provided answer matches the correct answer, false otherwise.
     */
    isCorrectAnswer(answer) {
        return answer.toLowerCase() === this.#correctAnswer.toLowerCase();
    }
}