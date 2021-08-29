import decimal128Type from '../decimal128Type';
import mongoose from 'mongoose';

describe('Mongoose decimal128 type utilities', () => {
  it('should have mongoose schema type Decimal128', () => {
    expect(decimal128Type.type).toBe(mongoose.Types.Decimal128);
  });

  it('can convert Decimal128 value to normal number', () => {
    const decimalNumber = mongoose.Types.Decimal128.fromString('123.456');
    expect(decimal128Type.get(decimalNumber)).toBe(123.456);
  });

  it('return null on null data', () => {
    expect(decimal128Type.get(null)).toBeNull();
  });
});
