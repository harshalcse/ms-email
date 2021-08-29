import mongoose from 'mongoose';

const decimal128Type = {
  type: mongoose.Types.Decimal128,
  get: (val?: mongoose.Types.Decimal128): number | undefined => {
    if (!val) return val;
    return parseFloat(val.toString());
  }
};

export default decimal128Type;
