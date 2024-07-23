export default class Encoder {

    /**
     * Encodes HTML entities in a given string.
     * 
     * @param {string} rawStr The raw string to encode HTML entities.
     * @returns {string} The encoded string with HTML entities.
     */
    static htmlEntitiesEncode(rawStr) {
        return rawStr.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';');
    }

    /**
     * Decodes HTML entities in a given string.
     * 
     * @param {string} rawStr The raw string containing HTML entities to decode.
     * @returns {string} The decoded string without HTML entities.
     */
    static htmlEntitiesDecode(rawStr) {
        const txt = document.createElement('textarea');
        txt.innerHTML = rawStr;
        return txt.value;
    }
}