import hapi from '@hapi/hapi';
import { ValidationError } from '@hapi/joi';
import { ERROR_CODE, ErrorList, JoiValidationErrors } from '../common/errors';
import { AppError, ErrorDetails } from '../errors/AppError';

interface JoiValidationErrors {
  [index: string]: ERROR_CODE;
}

const errorHandler: hapi.Lifecycle.Method = (
  _req: hapi.Request,
  res: hapi.ResponseToolkit,
  err?: Error
) => {
  if (!err) {
    return res.continue;
  }
  if ((err as ValidationError).isJoi) {
    const details = (err as ValidationError).details;
    const mappedDetails = details.reduce<ErrorDetails[]>(
      (acc, detail, index) => {
        if (index !== 0 && detail.path[0] === details[index - 1].path[0]) {
          return acc;
        }

        const constraint = detail.type.split('.').pop() || '';
        const errorCode =
          (JoiValidationErrors as JoiValidationErrors)[constraint] ||
          ERROR_CODE.INCORRECT_FIELD;
        const defaultError = ErrorList[errorCode];
        acc.push({
          message: defaultError.message,
          code: errorCode,
          key: `${detail.path[0]}`
        });

        return acc;
      },
      []
    );
    throw new AppError(ERROR_CODE.INVALID_REQUEST, mappedDetails);
  }

  throw err;
};

export default errorHandler;
