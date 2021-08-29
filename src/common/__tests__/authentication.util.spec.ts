import { getAuthPayload } from '../authentication.util';
import { AppError } from '../../errors/AppError';
import { ERROR_CODE } from '../errors';

describe('authentication util', () => {
  describe('getAuthPayload', () => {
    it('should throw if token do not provide cif', () => {
      const request: any = {
        auth: {}
      };
      expect(() => getAuthPayload(request)).toThrowError(
        new AppError(ERROR_CODE.UNAUTHORIZED)
      );
    });

    it('should throw if token do not provide customerId', () => {
      const request: any = {
        auth: {
          credentials: {
            payload: {
              cif: 'cif'
            }
          }
        }
      };
      expect(() => getAuthPayload(request)).toThrowError(
        new AppError(ERROR_CODE.UNAUTHORIZED)
      );
    });

    it('should return customerId and cif', () => {
      const request: any = {
        auth: {
          credentials: {
            payload: {
              cif: 'cif',
              customerId: 'customerId'
            }
          }
        }
      };
      expect(getAuthPayload(request)).toEqual({
        cif: 'cif',
        customerId: 'customerId'
      });
    });
  });
});
