class Item {
  constructor(name, quantity, unitPrice) {
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  getTotal() {
    return this.quantity * this.unitPrice;
  }
}

module.exports = Item;
