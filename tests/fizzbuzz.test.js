const fizzbuzz = require('../exercise1');

describe("fizzbuzz", ()=> {
  it('should throw if input is not number', ()=> {
    // string
    // object
    // boolean
    // function
    const args = ['tue', { id: 4 }, true, function() {}, null, undefined];
    args.forEach(a => {
      expect(()=> { fizzbuzz.fizzBuzz(a)}).toThrow();
    })
  })
  
  it('should return FizzBuzz if input module 3 and module 5 is 0', ()=>{
    const result = fizzbuzz.fizzBuzz(15);
    expect(result).toEqual('FizzBuzz');
  })

  it('should return Fizz if input module 3 is zero', () => {
    const result = fizzbuzz.fizzBuzz(9);
    expect(result).toEqual('Fizz');
  })

  it('shoudl return Buzz if input module 5 is zero', () => {
    const result = fizzbuzz.fizzBuzz(20);
    expect(result).toEqual('Buzz');
  })

  it('should return input itself if input module 3 and module 5 is different 0', () => {
    const result = fizzbuzz.fizzBuzz(8);
    expect(result).toEqual(8);
  })
})