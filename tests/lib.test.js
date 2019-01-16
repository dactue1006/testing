const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', ()=> {
  it("shoudld return a positive number if input is positive", ()=> {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  })
  
  it("shoudld return a positive number if input is negative", ()=> {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  })
  
  it("shoudld return 0 if input is 0", ()=> {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  })
})

describe('greet', ()=> {
  it('should return welcome ...', () => {
    const result = lib.greet("Tue");
    expect(result).toMatch(/Tue/);
  })
})

describe('get currencies', ()=> {
  it('should return supported currencies', ()=> {
    const result = lib.getCurrencies();

    // too general 
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // too specifies
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    // proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']))
  })
})

describe('getProduct', () => {
  it('should return the product with given id', () => {
    const result = lib.getProduct(1);
    //expect(result).toBe({ id: 1, price: 10})

    expect(result).toMatchObject({ id: 1, price: 10 });

    expect(result).toHaveProperty('id', 1);
  })
})

describe('registerUser', () => {
  it('should throw is username is falsy', () => {
    // null
    // undefined
    // NaN
    // ''
    // 0
    // false
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(()=> { lib.registerUser(a) }).toThrow()
    })
  })
  it('should return user object', () => {
    const result = lib.registerUser('tue');
    expect(result).toMatchObject({ username: 'tue'});
    expect(result.id).toBeGreaterThan(0);
  })
})

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId){
      console.log('Fake reading customer...');
      return { id: customerId, points: 20}
    }

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  })
})

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })

    mail.send = jest.fn();
    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  })
})