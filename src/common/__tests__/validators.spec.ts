import { currencyValidator } from '../validator';

describe('currencyValidator', () => {
  it('should return error when the number is have more than 2 number in decimal part', () => {
    const result = currencyValidator.validate(123456.123);
    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toEqual(
      '"value" must have no more than 2 decimal places'
    );
  });

  it('should return error when the number is have more than 14 number', () => {
    const result = currencyValidator.validate(12345678901112131.12);
    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toEqual(
      '"value" must be a safe number'
    );
  });

  it('should return error when the number is negative', () => {
    const result = currencyValidator.validate(-1234567890111.12);
    expect(result.error).toBeDefined();
    expect(result.error.details[0].message).toEqual(
      '"value" must be a positive number'
    );
  });

  it('should return result with no error when the number is valid', () => {
    const result = currencyValidator.validate(12345678901112.12);
    expect(result.error).toBeNull();
  });
});
