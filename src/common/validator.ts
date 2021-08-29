import * as Joi from '@hapi/joi';

// TODO: move to common place, may be common-joi
export const currencyValidator = Joi.number()
  .precision(2)
  .strict()
  .positive()
  .max(99999999999999);
