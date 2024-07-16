class ProductCategory {

    #name;
    productList = [];

    /**
     * Constructor
     * @param {string} name of the category
     */
    constructor(name) {
        this.#name = name;
        this.productList = [];
    }

    // Getters and setters
    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    /**
     * Adds a product to the product list.
     * @param {Product} product
     * @returns {boolean} True if the product is added or false if a product with the same name already exists.
     */
    addProduct(product) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        if (this.productList.some(p => p.name === product.name)) {
            return false;
        }
        this.productList.push(product);
        return true;
    }

    /**
     * Remove a product from product list by product name
     * @param {string} productName
     * @returns {boolean} True if product is removed or false if product isn't
     */
    removeProduct(productName) {
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        const indexProductFound = this.productList.findIndex(product => productName === product.name);

        if (indexProductFound === -1) {
            return false;
        }
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        this.productList.splice(indexProductFound, 1);
        return true;
    }

    /**
     * Find a product from product list by product name
     * @param {string} productName
     * @returns a Product if found and false if not
     */
    getProductByName(productName) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        const product = this.productList.find(product => productName === product.name);
        return product ? product : false;
    }

    /**
     * Get the product list. If pending is true, it returns only pending products
     * On the other hand, if pending is false, it returns the whole product list
     * @param {boolean} pending by default is false
     * @returns 
     */
    getProducts(pending = false) {

        if (pending) {
            // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            return this.productList.filter(product => true === product.pending);
        }
        return this.productList;
    }

    /**
     * Compute the total cost of all the products stored in the product list
     * @returns the cost
     */
    getCategoryCost() {
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        return this.productList.reduce((total, product) => total + product.cost(), 0);
    }
}