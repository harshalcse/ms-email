import { get } from 'lodash';
import hapi from '@hapi/hapi';

import { AppError } from '../errors/AppError';
import { ERROR_CODE } from './errors';

export const getAuthPayload = (
  request: hapi.Request
): {
  cif: string;
  customerId: string;
} => {
  const auth = get(request, 'auth.credentials.payload', {});
  if (!auth.customerId) {
    throw new AppError(ERROR_CODE.UNAUTHORIZED);
  }
  return auth;
};
