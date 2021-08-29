import { MongoMemoryServer } from 'mongodb-memory-server';
import { config } from '@dk/module-config';
import {
  connectMongo,
  MONGO_DB_NAME,
  MONGO_PASS_PARAM,
  MONGO_USER_PARAM
} from '../mongoDb';
import logger from '../../logger';
import mongoose from 'mongoose';

jest.mock('@dk/module-config');

describe('dbConnect', () => {
  const mockConfig = (
    uri: string = undefined,
    dbName: string = undefined,
    username: string = undefined,
    pwd: string = undefined
  ) => {
    (config.get as jest.Mock).mockImplementation(key => {
      switch (key) {
        case MONGO_USER_PARAM: {
          return username;
        }
        case MONGO_DB_NAME: {
          return dbName;
        }
        case MONGO_PASS_PARAM: {
          return pwd;
        }
        default: {
          return undefined;
        }
      }
    });
  };

  describe('connectMongo', () => {
    let mongod: MongoMemoryServer;

    beforeEach(() => {
      mongod = new MongoMemoryServer();
    });

    afterEach(() => {
      mongod.stop();
    });

    it(`should reject if ${MONGO_DB_NAME} is not provided`, async () => {
      mockConfig('mongodb://localhost', undefined);
      jest.spyOn(logger, 'error');
      const error = await connectMongo().catch(error => error);
      expect(error).toBeDefined();
    });

    it(`should throw error if has any error event in connection`, async () => {
      jest.spyOn(mongoose, 'connect').mockImplementationOnce((): any => {
        mongoose.connection.emit('error', new Error());
        return new Promise(resolve => {
          resolve();
        });
      });
      mockConfig(await mongod.getConnectionString(), 'test_db', '', '');
      const error = await connectMongo().catch(error => error);
      expect(error).toBeDefined();
    });
  });
});
