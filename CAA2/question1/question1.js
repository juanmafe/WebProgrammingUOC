function filterItems() {

    const itemList = document.querySelectorAll('.list .item');

    itemList.forEach(item => {

        const dataId = item.getAttribute('data-id');

        if (!isNaN(dataId)) {
            const id = parseInt(dataId);

            if (id % 2 === 0) {
                item.style.display = 'none';
                return;
            }
        }

        const dataName = item.getAttribute('data-name');

        if (!dataName.toLowerCase().startsWith('f')) {
            item.style.display = 'none';
            return;
        }

        item.textContent = dataName;
    });
}
