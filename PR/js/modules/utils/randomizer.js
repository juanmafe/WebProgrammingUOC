export default class Randomizer {

    /**
    * Randomizes the order of elements in an array.
     * 
    * @param {Array} arr The array to be randomized.
    * @returns {Array} A new array with the elements randomly shuffled.
    */
    static randomizeArray(arr) {
        const copy = arr.slice();

        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }

        return copy;
    }
}