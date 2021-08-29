enum ERROR_CODE {
  INVALID_MANDATORY_FIELDS = 'INVALID_MANDATORY_FIELDS',
  INCORRECT_EMAIL_FORMAT = 'INCORRECT_EMAIL_FORMAT',
  INCORRECT_FIELD = 'INCORRECT_FIELD',
  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_REGISTER_PARAMETER = 'INVALID_REGISTER_PARAMETER',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR', // do not use this when create AppError
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND'
}

const JoiValidationErrors = {
  required: ERROR_CODE.INVALID_MANDATORY_FIELDS,
  empty: ERROR_CODE.INVALID_MANDATORY_FIELDS
};

const ErrorList = {
  [ERROR_CODE.INCORRECT_EMAIL_FORMAT]: {
    statusCode: 400,
    message: 'Incorrect email format'
  },
  [ERROR_CODE.INCORRECT_FIELD]: {
    statusCode: 400,
    message: 'Incorrect field value, data type or length'
  },
  [ERROR_CODE.INVALID_REQUEST]: {
    statusCode: 400,
    message: 'Invalid request'
  },
  [ERROR_CODE.UNEXPECTED_ERROR]: {
    statusCode: 500,
    message: 'We caught unexpected error'
  },
  [ERROR_CODE.INVALID_REGISTER_PARAMETER]: {
    statusCode: 400,
    message: 'Invalid parameter setting'
  },
  [ERROR_CODE.INVALID_MANDATORY_FIELDS]: {
    statusCode: 400,
    message: 'Required field cannot be empty'
  },
  [ERROR_CODE.UNAUTHORIZED]: {
    statusCode: 401,
    message: 'User do not have permission to perform action'
  },
  [ERROR_CODE.RESOURCE_NOT_FOUND]: {
    statusCode: 400,
    message: 'Resource not found'
  }
};

export { ERROR_CODE, ErrorList, JoiValidationErrors };
