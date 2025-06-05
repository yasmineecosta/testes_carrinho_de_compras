class Cart {
  constructor() {
    this.items = [];
    this.coupon = null;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItemByName(name) {
    this.items = this.items.filter(item => item.name !== name);
  }

  listItems() {
    return this.items;
  }

  applyCoupon(coupon, service) {
    if (service.validate(coupon)) {
      this.coupon = coupon;
    }
  }

  getTotal() {
    let total = this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    if (this.coupon) {
      total = this.coupon.apply(total);
    }
    return total;
  }
}

module.exports = Cart;
