class Coupon {
  constructor(code, fixedValue = 0, percentage = 0) {
    this.code = code;
    this.fixedValue = fixedValue;
    this.percentage = percentage;
  }

  apply(total) {
    if (this.fixedValue > 0) {
      return Math.max(0, total - this.fixedValue);
    }
    if (this.percentage > 0) {
      return total * (1 - this.percentage / 100);
    }
    return total;
  }
}

module.exports = Coupon;
