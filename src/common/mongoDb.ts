import { connect, connection } from 'mongoose';

export const MONGO_USER_PARAM = 'MONGO_USER';
export const MONGO_PASS_PARAM = 'MONGO_PASS';
export const MONGO_DB_NAME = 'MONGO_DB_NAME';
export const MONGO_HOSTS = 'MONGO_HOSTS';

export const connectMongo = () =>
  new Promise<void>((resolve, reject) => {
    const dbUri = 'mongodb://localhost:27017/email_db';

    connection.once('open', () => resolve());

    connection.on('error', err => {
      console.log('error while connecting to mongodb', err);
      reject(err);
    });

    connect(
      dbUri,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );
  });
