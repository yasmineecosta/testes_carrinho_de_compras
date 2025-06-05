const Cart = require('../src/Cart');
const Item = require('../src/Item');
const Coupon = require('../src/Coupon');
const CouponService = require('../src/CouponService');

jest.mock('../src/CouponService');

describe('Carrinho de Compras', () => {
  beforeEach(() => {
    CouponService.mockClear();
  });

  test('Adicionar item ao carrinho', () => {
    const cart = new Cart();
    cart.addItem(new Item('Camiseta', 2, 50));
    expect(cart.listItems().length).toBe(1);
  });

  test('Remover item do carrinho', () => {
    const cart = new Cart();
    cart.addItem(new Item('Fone', 1, 100));
    cart.removeItemByName('Fone');
    expect(cart.listItems().length).toBe(0);
  });

  test('Calcular total sem cupom', () => {
    const cart = new Cart();
    cart.addItem(new Item('Livro', 2, 30));
    expect(cart.getTotal()).toBe(60);
  });

  test('Aplicar cupom percentual', () => {
    const cart = new Cart();
    const coupon = new Coupon('PROMO10', 0, 10);
    const service = new CouponService();
    service.validate.mockReturnValue(true);

    cart.addItem(new Item('Camiseta', 1, 100));
    cart.applyCoupon(coupon, service);

    expect(cart.getTotal()).toBe(90);
  });

  test('Aplicar cupom fixo', () => {
    const cart = new Cart();
    const coupon = new Coupon('DESC20', 20, 0);
    const service = new CouponService();
    service.validate.mockReturnValue(true);

    cart.addItem(new Item('Mouse', 2, 50));
    cart.applyCoupon(coupon, service);

    expect(cart.getTotal()).toBe(80);
  });
  
  test('Não aplicar cupom inválido', () => {
  const cart = new Cart();
  const coupon = new Coupon('INVALIDO', 0, 50);
  const service = new CouponService();
  service.validate.mockReturnValue(false); // cupom inválido

  cart.addItem(new Item('Fone', 1, 100));
  cart.applyCoupon(coupon, service);

  expect(cart.getTotal()).toBe(100); // total não deve mudar
});

test('Item com quantidade negativa não deve alterar total', () => {
  const cart = new Cart();
  cart.addItem(new Item('Monitor', -2, 300)); // quantidade inválida
  expect(cart.getTotal()).toBe(0); // item inválido ignorado ou valor zero
});

test('Item com preço negativo não deve alterar total', () => {
  const cart = new Cart();
  cart.addItem(new Item('Notebook', 1, -1000)); // preço inválido
  expect(cart.getTotal()).toBe(0); // item inválido ignorado ou valor zero
});

test('Cupom percentual acima de 100% deve limitar total a zero', () => {
  const cart = new Cart();
  const coupon = new Coupon('LOUCURA', 0, 150); // 150% de desconto
  const service = new CouponService();
  service.validate.mockReturnValue(true);

  cart.addItem(new Item('Livro', 1, 40));
  cart.applyCoupon(coupon, service);

  expect(cart.getTotal()).toBe(0); // total nunca negativo
});

test('Remover item inexistente não deve causar erro', () => {
  const cart = new Cart();
  cart.addItem(new Item('Teclado', 1, 80));
  expect(() => cart.removeItemByName('Mouse')).not.toThrow();
  expect(cart.getTotal()).toBe(80);
});

});
