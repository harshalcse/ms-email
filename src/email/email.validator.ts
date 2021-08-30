import Joi from '@hapi/joi';

export const sendEmailRequestValidator = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    subject: Joi.string().required(),
    body: Joi.string().required()
}).label('Request - send email');

export const sendEmailResponseValidator = Joi.object({
    status: Joi.string().required(),
    response: Joi.string().required()
}).label('Response - send email');
