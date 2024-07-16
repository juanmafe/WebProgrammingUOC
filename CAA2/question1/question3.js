function filterItems() {

    // We get all elements that have the class "list" using his class selector and
    // all elements inside of "list" whose his class is "item" (using his class selector too).
    // To do this, we must follow an order of priority, first ".list" and then ".item"
    // (the most general to the most specific class selector).
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    const itemList = document.querySelectorAll('.list .item');

    itemList.forEach(item => {

        // We parse "data-id" to integer to detect if it is an even number.
        const dataId = item.getAttribute('data-id');

        if (!isNaN(dataId)) {
            const id = parseInt(dataId);

            if (id % 2 === 0) {
                // We hide the element applying a none value to his display property.
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
                item.style.display = 'none';
                return;
            }
        }

        // We check dataName does not start with "f" (case-insensitive).
        const dataName = item.getAttribute('data-name');

        if (!dataName.toLowerCase().startsWith('f')) {
            // We hide the element applying a none value to his display property.
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
            item.style.display = 'none';
            return;
        }

        //For the rest, we fill the text content with its data-name attribute.
        item.textContent = dataName;
    });
}
