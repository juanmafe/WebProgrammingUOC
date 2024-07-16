class Product {

    name;
    price;
    quantity;
    pending;

    /**
     * Constructor
     * @param {string} name of the product
     * @param {number} price for a unit of the product
     * @param {number} quantity of the product to be bought
     * @param {boolean} pending of be purchased
     */
    constructor(name, price, quantity, pending) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.pending = pending;
    }

    /**
     * Compute the cost of the product
     * @returns {number} cost of the product
     */
    cost() {
        return this.price * this.quantity;
    }

  }
  