import errorHandler from '../handleValidationErrors';
import { ERROR_CODE } from '../../common/errors';
import { AppError } from '../../errors/AppError';

describe('handleValidationErrors', () => {
  const request = {};
  const response = { continue: '' };
  it('should return continue if there is no error', () => {
    const result = errorHandler(request, response, null);
    expect(result).toBe(response.continue);
  });

  it('should return origin error if it is not Joi validation errors', () => {
    const someError = new Error();
    try {
      errorHandler(request, response, someError);
    } catch (err) {
      expect(err).toBe(someError);
    }
  });

  it('should filter duplicated path of errors', () => {
    class JoiError extends Error {
      isJoi = true;
      details = [
        { message: 'message', path: ['message'], type: 'invalid' },
        { message: 'message', path: ['message'], type: 'min' }
      ];
    }
    const joiError = new JoiError();
    try {
      errorHandler(request, response, joiError);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.errorCode).toEqual(ERROR_CODE.INVALID_REQUEST);
      expect(err.errors.length).toBe(1);
      expect(err.errors[0].key).toEqual('message');

      expect(err.errors[0].code).toEqual(ERROR_CODE.INCORRECT_FIELD);
    }
  });

  it('should return default code if default error for the constraint is not defined', () => {
    class JoiError extends Error {
      isJoi = true;
      details = [{ message: 'message', path: ['message'], type: 'invalid' }];
    }
    const joiError = new JoiError();
    try {
      errorHandler(request, response, joiError);
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      expect(err.errorCode).toEqual(ERROR_CODE.INVALID_REQUEST);
      expect(err.errors[0].key).toEqual('message');

      expect(err.errors[0].code).toEqual(ERROR_CODE.INCORRECT_FIELD);
    }
  });
});
