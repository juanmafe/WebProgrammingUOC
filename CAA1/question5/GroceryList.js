class GroceryList {

    categoryList;

    /**
     * Constructor
     */
    constructor() {
        this.categoryList = [new ProductCategory("default")];
    }

    /**
     * Add a new category to the category list if not exist
     * @param {string} categoryName
     * @returns true if category is added or false if not
     */
    addCategory(categoryName) {
        if (this.categoryList.some(category => categoryName === category.getName())) {
            return;
        }
        this.categoryList.push(new ProductCategory(categoryName));
    }

    /**
     * Adds a new category if it does not exist and returns it
     * @param {category} possibleCategory 
     * @param {string} categoryName 
     * @returns the category
     */
    addAndGetPossibleCategory(possibleCategory, categoryName) {
        if (possibleCategory) {
            return possibleCategory;
        }
        this.addCategory(categoryName);
        return this.categoryList.find(possibleCategory => categoryName === possibleCategory.getName());
    }
    
    /**
     * Add a product to a category
     * @param {product} product 
     * @param {string} categoryName 
     */
    add(product, categoryName = "default") {
        const possibleCategory = this.categoryList.find(category => categoryName === category.getName());
        const finalCategory = this.addAndGetPossibleCategory(possibleCategory, categoryName)
        finalCategory.addProduct(product);
    }

    /**
     * Removes all the products that match with the name in all categories
     * @param {string} productName 
     * @returns true if at least one product is removed or false if not
     */
    remove(productName) {
        // Normally I use immutable variables (const in javascript or final in java, for example),
        // but here I need a variable that can be modified within the scope of the method.
        let productRemoved = false;

        this.categoryList.forEach(category => {
            const isRemoved = category.removeProduct(productName);
            if (isRemoved) {
                productRemoved = true;
            }
        }); 
        return productRemoved;
    }

    /**
     * Find all matching products (partially or fully) in all available categories
     * @param {string} searchTerm 
     * @returns an array with products
     */
    search(searchTerm) {
        const products = [];

        this.categoryList.forEach(category => {
            // To maximize matches, we convert the strings to lowercase and use a cointains for the partial search
            // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
            const foundProducts = category.getProducts().filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => {
                
                // I am very used to functional programming and, 
                // although it could have been done differently,
                // I am very comfortable using map for transformations.
                products.push(product);
            });
        });
        return products;
    }

    /**
     * Get all pending products from all the available categories
     * @returns an array with all pending products
     */
    getPendingProducts() {
        const pendingProducts = [];

        this.categoryList.forEach(category => {
            category.getProducts(true).forEach(pendingProduct => {
                pendingProducts.push(pendingProduct);
            });
        });
        return pendingProducts;
    }

    /**
     * Get the total cost of all categories
     * @returns the total cost
     */
    getTotalCost() {
        return this.categoryList.reduce((total, category) => {
            return total + category.getCategoryCost();
        }, 0);
    }

    /**
     * Get the most expensive product of all categories
     * @returns the most expensive product
     */
    getMostExpensiveProduct() {
        let mostExpensiveProduct = null;
        let highestPrice = 0;

        this.categoryList.forEach(category => {
            category.getProducts().forEach(product => {

                if (highestPrice < product.price) {
                    highestPrice = product.price;
                    mostExpensiveProduct = product;
                }
            });
        });
        return mostExpensiveProduct;
    }

    /**
     * Get all categories that are ready to be overviewed
     * @returns the overviewed category list
     */
    getOverviewedCategories() {
        return this.categoryList.filter(category => category.getProducts().length > 0);
    }

    /**
     * Get a category information structure showing the category name,
     * the number of products and the total cost of each category
     * @returns the overview
     */
    getOverview() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        // i.e. const func = () => ({ foo: 1 });
        return this.getOverviewedCategories().map(category => ({
            category: category.getName(),
            nProducts: category.getProducts().length,
            totalCost: category.getCategoryCost(),
        }));
    }
}